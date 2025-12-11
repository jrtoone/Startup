## 🚀 React Phase 1: Routing Deliverable

For this deliverable I converted my startup application from plain HTML/CSS into a Vite + React project. I followed the Simon React Part 1 instructions and restructured my application into components with a client-side router. This phase does not include reactivity; it prepares the application for React-based logic in the next deliverable.

- **Bundled using Vite** – Vite now builds and serves my application. I verified the development server, hot module reloading, and production build output.

- **Components** – I created multiple components representing the major sections of my application.  
  - `HomePage` contains my original home page content including the Bootstrap navbar, games list, and login form.  
  - `ActiveGamesPage` contains the Bootstrap grid demonstration from my prior implementation.  
  - Additional components (`CreateGroupPage`, `JoinGroupPage`, `MyBoardsPage`, `PublicBoardsPage`) are included as structured stubs for future work.

- **Router** – I installed and configured React Router to navigate between pages.  
  - Wrapped the application in `<BrowserRouter>` in `main.jsx`.  
  - Added `<Routes>` and `<Route>` definitions in `App.jsx` for each page in the application.  
  - Updated internal navigation to use `<Link>` elements.

- **CSS and Bootstrap integration** – I installed Bootstrap through npm and imported it, alongside my existing `StyleSheet.css`, directly into the React entry point for global styling.

- **Application identity** – I added my name and a prominent link to my GitHub startup repository in the footer of the home page as required by the deliverable rubric.

- **Deployment** – I replaced my previous deployment script with `deployReact.sh` from the Simon React project. I built the production version of my React application and deployed it to my production server using the required `-s startup` parameter. The React application is now live at my startup domain.


## 🚀 React Phase 2: Reactivity Deliverable

For this deliverable I used JavaScript and React to make my startup fully functional for a single user.  
All core functionality is now implemented or appropriately mocked out using local storage and simulated WebSocket behavior.

### ✔ All functionality implemented or mocked out
- Login system fully works using `localStorage` to persist the username.
- "My Boards" page supports creating and saving bingo boards locally.
- "Active Games" page simulates live updates using `setInterval` (mocking future WebSocket messages).
- Routing and navigation are fully functional across all pages.
- A persistent Bootstrap navbar appears on every page.

### ✔ Hooks
- **useState** is used throughout for user login state, board lists, game data, and form values.
- **useEffect** is used for:
  - Loading saved login and board data from `localStorage`.
  - Simulating real-time game updates in Active Games.
  - Initializing component state when pages load.

This completes the reactivity portion of the project. The app now behaves like a real interactive application, with dynamic components and persistent user data.

# Service deliverable

For this deliverable I added backend service support to my startup application, including authentication, restricted endpoints, and a third-party API integration.

- **Node.js/Express HTTP service – done!**  
  Backend service created in `/service/index.js` using Express, cookie-parser, bcryptjs, and uuid.

- **Static middleware for frontend – done!**  
  Express serves the bundled React frontend from the `public` directory in production.

- **Calls to third party endpoints – done!**  
  Added a TempleOSRS collection log proxy (`/api/temple/recent/:username`). I know whoever is grading this likely has never played RuneScape, the game in which this website intereacts. So feel free to use either my username 'MrMrFish' or the documentations provided username 'Mikael' to test the api call. Essentially, what it should give you back is a list of items recently obtained in game. The service I am using is called TempleOSRS, which is a third party that hosts game these API's for the game.
- **Backend service endpoints – done!**  
  Implemented endpoints for account creation, login, logout, session validation, a restricted `/api/boards` route, and the TempleOSRS API passthrough.

- **Frontend calls service endpoints – done!**  
  React now uses `fetch('/api/...')` to call all backend routes including auth, boards, and TempleOSRS data.

- **Supports registration, login, logout, and restricted endpoint – done!**  
  Authentication fully implemented using hashed passwords and HttpOnly cookies, with restricted routes requiring login.


## DB/Login deliverable

For this deliverable I associate the bingo boards with the logged in user. I stored the boards in the database.
To see this in motino, go to 'My Boards' and add one. You can refresh or logout but they persist, due to being stored on MangoDB.

- [x] **Stores data in MongoDB** - done!
- [x] **Use MongoDB to store credentials** - Stores both user and their boards.
