import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Simple nav just so you can still click to each route for testing */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/active-games">Active Games</Link></li>
          <li><Link to="/create-group">Create Group</Link></li>
          <li><Link to="/join-group">Join Group</Link></li>
          <li><Link to="/my-boards">My Boards</Link></li>
          <li><Link to="/public-boards">Public Boards</Link></li>
        </ul>
      </nav>

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
  return (
    <div>
      {/* Your Bootstrap navbar from index.html, just React-ified (class -> className) */}
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-xxl">
          <a href="intro" className="navbar-brand">
            <span className="fw-bold text-primary">
              <img
                src="https://oldschool.runescape.wiki/images/Guthix_symbol.png?c9020"
                alt="Guthix Logo"
                height="30"
              />
              {' '}
              Guthix Games
            </span>
          </a>

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

          <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#home" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="#games" className="nav-link">Games</a>
              </li>
              <li className="nav-item">
                <a href="#login" className="nav-link">Login</a>
              </li>
              <li className="nav-item d-md-none">
                <a href="#register" className="nav-link">Register</a>
              </li>
              <li className="nav-item ms-2 d-md-inline">
                <a href="#login" className="btn btn-secondary">Log In</a>
              </li>
              <li className="nav-item ms-2 d-md-inline">
                <a href="#register" className="btn btn-primary">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content from your original index.html body */}
      <main className="container mt-4">
        <h1>Guthix Games</h1>

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

        <h2 id="login">Login</h2>
        {/* For now, this is just the static form. We’ll wire up logic later in the React reactivity phase. */}
        <form id="loginForm">
          <input type="text" id="username" placeholder="username" />
          <input type="text" id="password" placeholder="password" />
          <button type="submit">Login</button>
        </form>
        <div id="output"></div>
      </main>

      <footer className="mt-4">
        <p>Created by <strong>Jacob Toone</strong></p>
        <a href="https://github.com/jrtoone/Startup">github</a>
      </footer>
    </div>
  );
}

/* ---------- Other pages still stubbed for now ---------- */

function ActiveGamesPage() {
  return (
    <main className="container-fluid my-5">
      <h2>Responsive Column Width</h2>
      <div className="row">
        <div className="col-6 col-sm-4 col-md-3d col-xl-2">
          <div className="p-5 bg-primary text-light">Col 1</div>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-xl-2">
          <div className="p-5 bg-primary text-light">Col 1</div>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-xl-2">
          <div className="p-5 bg-primary text-light">Col 1</div>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-xl-2">
          <div className="p-5 bg-primary text-light">Col 1</div>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-xl-2">
          <div className="p-5 bg-primary text-light">Col 1</div>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-xl-2">
          <div className="p-5 bg-primary text-light">Col 1</div>
        </div>
      </div>

      <div className="container-s my-5">
        <h2>Justifying Columns</h2>
      </div>

      <h6>
        <Link to="/">Return Home</Link>
      </h6>
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
  return <h1>My Boards (stub)</h1>;
}

function PublicBoardsPage() {
  return <h1>Public Boards (stub)</h1>;
}

export default App;