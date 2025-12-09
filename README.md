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
