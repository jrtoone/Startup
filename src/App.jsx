import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Temporary simple nav just so we can click around.
          We can replace this with your Bootstrap navbar later. */}
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

// ---- Stub pages (we'll replace these with your real HTML later) ----

function HomePage() {
  return <h1>Home (stub)</h1>;
}

function ActiveGamesPage() {
  return <h1>Active Games (stub)</h1>;
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