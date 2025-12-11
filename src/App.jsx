import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div>
      {/* Persistent Guthix navbar */}
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <span className="fw-bold text-primary">
              <img
                src="https://oldschool.runescape.wiki/images/Guthix_symbol.png?c9020"
                alt="Guthix Logo"
                height="30"
              />{' '}
              Guthix Games
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end align-center"
            id="main-nav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/active-games" className="nav-link">
                  Active Games
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-boards" className="nav-link">
                  My Boards
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/public-boards" className="nav-link">
                  Public Boards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page content below navbar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/active-games" element={<ActiveGamesPage />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/join-group" element={<JoinGroupPage />} />
        <Route path="/my-boards" element={<MyBoardsPage />} />
        <Route path="/public-boards" element={<PublicBoardsPage />} />
      </Routes>
    </div>
  );
}

/* ---------- Home page: React version of your index.html ---------- */

function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setLoggedInUser(data.username);
          setUsername('');
          setPassword('');
        } else {
          // Not logged in or error; just treat as logged-out
          setLoggedInUser(null);
        }
      } catch (err) {
        console.error('Error loading current user', err);
      }
    }

    loadUser();
  }, []);

  async function handleLoginSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password) {
      alert('Please enter both username and password');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoggedInUser(data.username);
        setPassword('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.msg || 'Login failed');
      }
    } catch (err) {
      console.error('Error logging in', err);
      alert('Error logging in. Please try again.');
    }
  }

  async function handleRegister() {
    if (!username.trim() || !password) {
      alert('Please enter both username and password to register');
      return;
    }

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoggedInUser(data.username);
        setPassword('');
        alert('Account created and logged in!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 409) {
          alert(errorData.msg || 'User already exists');
        } else {
          alert(errorData.msg || 'Registration failed');
        }
      }
    } catch (err) {
      console.error('Error registering', err);
      alert('Error creating account. Please try again.');
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        console.warn('Logout returned non-OK status', response.status);
      }

      setLoggedInUser(null);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Error logging out', err);
      setLoggedInUser(null);
      setUsername('');
      setPassword('');
    }
  }

  return (
    <div>
      {/* Main content from your original index.html body */}
      <main className="container mt-4">
        <h1>Guthix Games</h1>
        {loggedInUser ? (
          <p>
            Welcome back, <strong>{loggedInUser}</strong>!
          </p>
        ) : (
          <p>
            Welcome to Guthix Games. Please log in to manage your boards and games.
          </p>
        )}
        <h2 id="games">Games</h2>
        <ul>
          <li>
            <strong>Bingo</strong>
            <ul>
              <li>
                Play
                <ul>
                  <li><Link to="/create-group">Create a Group</Link></li>
                  <li><Link to="/join-group">Join a Group</Link></li>
                  <li><Link to="/active-games">Active Games</Link></li>
                </ul>
              </li>
              <li>
                Boards
                <ul>
                  <li><Link to="/my-boards">My Boards</Link></li>
                  <li><Link to="/public-boards">Public Boards</Link></li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Battleship</li>
          <li>Monopoly</li>
          <li>Connect 4</li>
          <li>Chutes and Ladders</li>
          <li>Drop Hunt</li>
          <li>XP Race</li>
          <li>Boss KC Race</li>
          <li>Daily&apos;s</li>
        </ul>

        {loggedInUser ? (
          <div>
            <p>
              You are currently logged in as <strong>{loggedInUser}</strong>.
            </p>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button
              type='button'
              className='btn btn-outline-secondary'
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        )}

      </main>

      <footer className="mt-4">
        <p>Created by <strong>Jacob Toone</strong></p>
        <a href="https://github.com/jrtoone/Startup">github</a>
      </footer>
    </div>
  );
}

function ActiveGamesPage() {
  const [games, setGames] = useState([
    { id: 1, name: 'Corp Bingo', players: 5, maxPlayers: 10, status: 'Filling' },
    { id: 2, name: 'Slayer Task Tiles', players: 10, maxPlayers: 10, status: 'In progress' },
    { id: 3, name: 'Barrows Unique Hunt', players: 3, maxPlayers: 8, status: 'Filling' },
    { id: 4, name: 'TOB Learner Bingo', players: 7, maxPlayers: 12, status: 'Starting soon' },
  ]);

  useEffect(() => {
    // Mock WebSocket-like live updates
    const intervalId = setInterval(() => {
      setGames((currentGames) => {
        if (currentGames.length === 0) return currentGames;

        const index = Math.floor(Math.random() * currentGames.length);
        const game = currentGames[index];

        const delta = Math.random() < 0.5 ? -1 : 1;
        const newPlayers = Math.min(
          game.maxPlayers,
          Math.max(0, game.players + delta),
        );

        let newStatus;
        if (newPlayers === 0) {
          newStatus = 'Waiting for players';
        } else if (newPlayers === game.maxPlayers) {
          newStatus = 'Full';
        } else {
          newStatus = 'In progress';
        }

        const updatedGame = {
          ...game,
          players: newPlayers,
          status: newStatus,
        };

        const updatedGames = [...currentGames];
        updatedGames[index] = updatedGame;
        return updatedGames;
      });
    }, 3000); // every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="container mt-4">
      <h1>Active Games</h1>
      <p className="text-muted">
        These are mocked active bingo games that update periodically, simulating WebSocket updates.
      </p>

      <div className="row">
        {games.map((game) => (
          <div key={game.id} className="col-12 col-md-6 col-xl-3 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text mb-1">
                  Players: {game.players} / {game.maxPlayers}
                </p>
                <span className="badge bg-info text-dark">{game.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
function CreateGroupPage() {
  return <h1>Create Group (stub)</h1>;
}

function JoinGroupPage() {
  return <h1>Join Group (stub)</h1>;
}

function MyBoardsPage() {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [recentRsn, setRecentRsn] = useState('');
  const [recentItems, setRecentItems] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState(null);

  useEffect(() => {
    const savedBoards = JSON.parse(localStorage.getItem('gg_boards') || '[]');
    setBoards(savedBoards);
  }, []);
  function saveBoards(updatedBoards) {
    setBoards(updatedBoards);
    localStorage.setItem('gg_boards', JSON.stringify(updatedBoards));
  }
  function handleAddBoard(event) {
    event.preventDefault();

    const trimmedName = newBoardName.trim();
    if(!trimmedName) {
      alert('Please enter a board name');
      return;
    }

    const newBoard = {
      id:Date.now(),
      name: trimmedName,
    };

    const updatedBoards = [...boards, newBoard];
    saveBoards(updatedBoards);
    setNewBoardName('');
  }
  async function handleFetchRecent(event) {
    event.preventDefault();

    const trimmed = recentRsn.trim();
    if (!trimmed) {
      alert('Please enter an OSRS username');
      return;
    }

    setRecentLoading(true);
    setRecentError(null);
    setRecentItems([]);

    try {
      const response = await fetch(
        `/api/temple/recent/${encodeURIComponent(trimmed)}`
      );

      if (!response.ok) {
        let message = 'TempleOSRS request failed';
        try {
          const errJson = await response.json();
          if (errJson.msg) {
            message = errJson.msg;
          }
        } catch {
          // ignore JSON parse errors, keep default message
        }
        setRecentError(message);
        setRecentItems([]);
        setRecentLoading(false);
        return;
      }
  
      const data = await response.json();
      setRecentItems(data.items || []);
    } catch (err) {
      console.error('Error fetching recent collection log items', err);
      setRecentError('Could not load recent collection log items.');
    } finally {
      // we already setLoading(false) early on non-OK; this is for success/network failures
      setRecentLoading(false);
    }  }
  return (
    <main className="container mt-4">
      <h1>My Boards</h1>
      <p>Manage your personal bingo boards here. These are stored locally in your browser for now</p>

      {/*New board form*/}
      <form className="mb-3" onSubmit={handleAddBoard}>
        <div className="mb-2">
          <label className="form-label" htmlFor="newBoardName">
            New board name
          </label>
          <input
            id='newBoardName'
            type='text'
            className='form-control'
            placeholder='e.g. Slayer Task, Barrows Tiles, TOB Uniques, etc'
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add Board
        </button>
      </form>

      {/* List of boards */}
      {boards.length === 0 ? (
        <p>You don't have any boards yet. Add your first bingo board above!</p>
      ) : (
        <ul className='list-group'>
          {boards.map((board) => (
            <li key={board.id} className='list-group-item d-flex justify-content-between align-items-center'>
              <span>{board.name}</span>
              <span className='badge bg-secondary'>Bingo board</span>
            </li>
          ))}
        </ul>
      )}
            <hr className="my-4" />

<section>
  <h2>Recent Collection Log Items (TempleOSRS)</h2>
  <p className="text-muted">
    Enter an OSRS username to see their most recent collection log unlocks from TempleOSRS.
  </p>

  <form className="row gy-2 gx-2 align-items-center" onSubmit={handleFetchRecent}>
    <div className="col-sm-4">
      <input
        type="text"
        className="form-control"
        placeholder="OSRS username"
        value={recentRsn}
        onChange={(e) => setRecentRsn(e.target.value)}
      />
    </div>
    <div className="col-sm-auto">
      <button type="submit" className="btn btn-outline-primary">
        Load recent items
      </button>
    </div>
  </form>

  <div className="mt-3">
    {recentLoading && <p>Loading recent collection log items...</p>}

    {recentError && (
      <div className="alert alert-danger" role="alert">
        {recentError}
      </div>
    )}

    {!recentLoading && !recentError && recentItems.length === 0 && (
      <p className="text-muted">
        No recent items to display yet. Try searching for a player that has synced with TempleOSRS.
      </p>
    )}

    {recentItems.length > 0 && (
      <ul className="list-group">
        {recentItems.map((item, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.name || `Item ${item.id}`}</strong>
              {item.date && (
                <span className="text-muted ms-2">
                  ({item.date})
                </span>
              )}
            </div>
            {item.notable && (
              <span className="badge bg-warning text-dark">
                Notable
              </span>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
</section>
    </main>
  )
}

function PublicBoardsPage() {
  return <h1>Public Boards (stub)</h1>;
}

export default App;