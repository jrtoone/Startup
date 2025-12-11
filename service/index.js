// service/index.js
const fetch = require('node-fetch');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const app = express();

// In-memory stores (reset whenever the server restarts)
const users = new Map();      // username -> { passwordHash }
const authTokens = new Map(); // token -> username

// Use port 4000 by default, or override from command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve frontend from /public when deployed
app.use(express.static('public'));

// Helper: generate auth token (no uuid dependency needed)
function generateAuthToken() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return crypto.randomBytes(16).toString('hex');
}

// Helper: get current user from cookie
function getUserFromToken(req) {
  const token = req.cookies['authToken'];
  if (!token) {
    return null;
  }

  const username = authTokens.get(token);
  if (!username) {
    return null;
  }

  return { username };
}

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Guthix Games service is running' });
});

// Create account and log in
app.post('/api/auth/create', (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    if (users.has(username)) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    users.set(username, { passwordHash });

    const authToken = generateAuthToken();
    authTokens.set(authToken, username);

    res.cookie('authToken', authToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.status(201).json({ username });
  } catch (err) {
    console.error('Error in /api/auth/create:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    const user = users.get(username);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    const valid = bcrypt.compareSync(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    const authToken = generateAuthToken();
    authTokens.set(authToken, username);

    res.cookie('authToken', authToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.json({ username });
  } catch (err) {
    console.error('Error in /api/auth/login:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  try {
    const token = req.cookies['authToken'];
    if (token) {
      authTokens.delete(token);
    }
    res.clearCookie('authToken');
    return res.status(200).json({ msg: 'Logged out' });
  } catch (err) {
    console.error('Error in /api/auth/logout:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// Who am I? (restricted)
app.get('/api/user', (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ msg: 'Not authenticated' });
    }

    return res.json(user);
  } catch (err) {
    console.error('Error in /api/user:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// Restricted endpoint: only for logged-in users
app.get('/api/boards', (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ msg: 'Not authenticated' });
    }

    // Mock data for now
    const boards = [
      { id: 1, name: 'Corp Bingo', owner: user.username },
      { id: 2, name: 'Slayer Task Tiles', owner: user.username },
    ];

    return res.json({ boards });
  } catch (err) {
    console.error('Error in /api/boards:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// Proxy TempleOSRS recent collection log items for a player
app.get('/api/temple/recent/:username', async (req, res) => {
    const username = req.params.username;
  
    if (!username) {
      return res.status(400).json({ msg: 'Username required' });
    }
  
    try {
      const templeUrl =
        'https://templeosrs.com/api/collection-log/player_recent_items.php' +
        `?player=${encodeURIComponent(username)}` +
        '&count=10&includenames=1';
  
      const response = await fetch(templeUrl);
      if (!response.ok) {
        console.error('TempleOSRS response not OK:', response.status);
        return res
          .status(502)
          .json({ msg: 'TempleOSRS error', status: response.status });
      }
  
      const raw = await response.json();

      // If TempleOSRS returns an error object, forward that nicely
      if (raw.error) {
        console.error('TempleOSRS error for', username, raw.error);
        return res
          .status(404)
          .json({ msg: raw.error.Message || 'TempleOSRS: no collection log data' });
      }
      
      // Temple structure: raw.data is an object with items keyed by something
      const rawItems = raw.data || raw;
      
      const items = Object.values(rawItems).map((item) => ({
        id: item.id,
        name: item.name,
        date: item.date,
        date_unix: item.date_unix,
        notable:
          item.notable_item === 1 ||
          item.notable_item === '1' ||
          item.notable_item === true,
      }));
      
      res.json({
        username,
        items,
      });
    } catch (err) {
      console.error('Error calling TempleOSRS recent items:', err);
      res.status(500).json({ msg: 'Internal server error' });
    }
  });

// Start the service
app.listen(port, () => {
  console.log(`Guthix Games service listening on port ${port}`);
});