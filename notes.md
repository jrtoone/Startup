# 📘 CS 260 Web Programming — Midterm Notes

## 🧱 HTML BASICS

### Structure
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
    <script src="main.js"></script>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>

### Tags & Purpose
| Tag | Purpose |
|-----|----------|
| `<link>` | Links external resources (like CSS) to the document. Placed in `<head>`. |
| `<div>` | Defines a block-level container (no semantic meaning). Groups elements for CSS/JS. |
| `<span>` | Inline container (no line break). Used to style part of text. Default `display: inline`. |
| `<p>` | Paragraph |
| `<ol>` / `<ul>` | Ordered / Unordered list |
| `<li>` | List item |
| `<h1>`–`<h6>` | Headings (1 = largest) |
| `<img src="path" alt="desc">` | Displays an image |
| `<a href="https://...">` | Hyperlink (can wrap images) |
| `<script>` | Embeds or links JavaScript |
| `<style>` | Inline CSS in HTML |

**Image + Hyperlink Example:**
<a href="https://byu.edu">
  <img src="byu-logo.png" alt="BYU Logo">
</a>

**Declare HTML Document:**
<!DOCTYPE html>

---

## 🎨 CSS BASICS

### Selectors
| Selector | Example | Description |
|-----------|----------|-------------|
| ID | `#title` | Targets element with id="title" |
| Class | `.grid` | Targets all elements with class="grid" |
| Element | `div` | Targets all divs |
| Descendant | `div p` | Targets `<p>` inside `<div>` |
| Child | `div > p` | Targets direct child `<p>` of `<div>` |

### Box Model (inside → outside)
**content → padding → border → margin**

- **Padding** = space *inside* border, between content and border  
- **Margin** = space *outside* border, between element and neighbors  

Example:
div {
  padding: 10px; /* inside */
  margin: 5px;   /* outside */
}

### Common CSS Rules
div { background-color: red; } /* all divs red */
#title { color: blue; }         /* ID selector */
.grid { display: grid; }        /* class selector */
span { display: inline; }       /* default */

### Display / Flex / Grid
.container {
  display: flex;
  justify-content: center; /* horizontal alignment */
  align-items: center;     /* vertical alignment */
}

**Flex Example:**
.container {
  display: flex;
  flex-direction: row; /* images side by side */
}

---

## ⚙️ JAVASCRIPT BASICS

### Syntax
if (condition) { ... } 
else if (other) { ... } 
else { ... }

for (let i = 0; i < 5; i++) { console.log(i); }

while (x < 5) { x++; }

switch (fruit) {
  case 'apple': console.log('apple'); break;
  default: console.log('other');
}

### Functions
function add(x, y) { return x + y; }

// Arrow function
const add = (x, y) => x + y;

### Objects
const person = { name: "Jacob", age: 23 };
person.height = 180; // ✅ can add new properties

### Arrays
const arr = [1, 2, 3];
arr.map(x => x * 2); // [2, 4, 6]

### DOM Manipulation
const el = document.getElementById('byu');
el.style.color = 'green'; // change text color

document.querySelector('#byu'); // selects by CSS selector
document.querySelectorAll('.grid'); // all with class grid

el.addEventListener('click', () => console.log('clicked'));

**Example:**
document.getElementById('animal').textContent = 'crow';

### JSON
- **JavaScript Object Notation**
- Text-based data format (key/value)
- Example:
  const obj = { name: "Alice" };
  const json = JSON.stringify(obj); // object → string
  const parsed = JSON.parse(json);  // string → object

---

## ⏱ PROMISES

const promise = new Promise((resolve, reject) => {
  resolve('done');
});

promise.then(result => console.log(result)); // "done"

fetch('data.json')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

---

## 💻 TERMINAL COMMANDS

| Command | Description |
|----------|--------------|
| `pwd` | Print working directory |
| `cd <dir>` | Change directory |
| `ls` | List files |
| `ls -la` | List all files (including hidden) with details |
| `mkdir <name>` | Create directory |
| `rm <file>` | Remove file |
| `mv <src> <dest>` | Move or rename |
| `chmod` | Change file permissions |
| `vim`, `nano` | Text editors |
| `man <cmd>` | Manual for command |
| `ssh user@host` | Start remote shell session |
| `wget <url>` | Download file |
| `sudo` | Run command as superuser |
| `ps` | Show running processes |

---

## 🌐 NETWORK / DNS / PORTS

| Concept | Description |
|----------|--------------|
| **Domain** | `banana.fruit.bozo.click` |
| - TLD (Top Level Domain) | `click` |
| - Root Domain | `bozo.click` |
| - Subdomain | `banana.fruit` |
| **HTTPS** | Requires SSL/TLS certificate ✅ |
| **DNS A Record** | Maps domain → IP address (can point to IP or another A record) |

### Common Ports
| Port | Protocol |
|------|-----------|
| 80 | HTTP |
| 443 | HTTPS |
| 22 | SSH |

---

## 🧩 MISC PRACTICE OUTPUTS

### For Loop Example
for (let i = 0; i < 3; i++) console.log(i);
// Output: 0 1 2

### getElementById + Event
document.getElementById('foo')
  .addEventListener('click', () => console.log('clicked'));

### Padding Example
div { padding: 10px 20px; }
/* top/bottom = 10px, left/right = 20px */

### Change Only “trouble” to Green
<p><span class="trouble">trouble</span>double</p>
.trouble { color: green; }

---

## 🧭 Quick Reference Summary

- `#id` = unique element selector  
- `.class` = reusable style selector  
- `padding` = inside space; `margin` = outside  
- `span` = inline; `div` = block  
- Box model = content → padding → border → margin  
- JSON = data format (text representation of JS objects)  
- Promises = async operations with `.then()` and `.catch()`  
- Port 80 = HTTP, 443 = HTTPS, 22 = SSH  
- HTTPS requires certificate  
- `ls -la` = shows all files in long format  
- You can add new properties to JS objects dynamically  





CS 260 Final Exam – Quick Note Sheet

⸻

Networking & HTTP Basics

Default Ports
	•	HTTP: 80
	•	HTTPS: 443
	•	SSH: 22

HTTP Status Code Ranges
	•	300s (Redirection): Resource moved / client must take additional action
	•	400s (Client Error): Bad request, unauthorized, forbidden, not found
	•	500s (Server Error): Server failed to fulfill a valid request

Content-Type HTTP Header
	•	Tells the client/server how to interpret the body of the request/response
	•	Examples: application/json, text/html, image/png

⸻

Cookies & Security

Secure Cookie
	•	Sent only over HTTPS

HttpOnly Cookie
	•	Not accessible by JavaScript (protects against XSS)

SameSite Cookie
	•	Controls whether cookies are sent with cross-site requests
	•	Values: Strict, Lax, None

⸻

Express & Node.js

Express Middleware Execution
	•	Runs top to bottom in the order defined
	•	Each middleware must call next() to continue

MongoDB Query { name: "Mark" }
	•	Matches all documents where name equals exactly "Mark"

Password Storage (Best Practice)
	•	Never store plain text passwords
	•	Store hashed + salted passwords
	•	Common libraries: bcrypt, argon2

⸻

WebSockets

WebSocket Protocol Purpose
	•	Persistent, full-duplex communication between client and server
	•	Faster than polling or repeated HTTP requests

WebSocket Console Output Questions
	•	Front end logs depend on:
	•	What the server sends via socket.send()
	•	Event order: onopen → onmessage → onclose

⸻

JavaScript & Front End

fetch() Function
	•	Makes HTTP requests from the browser or Node
	•	Returns a Promise that resolves to a Response object
	•	Must call .json() or .text() to read body

What fetch() Returns
	•	A Promise, not the data itself

⸻

React

React Component Output
	•	JSX returns HTML-like elements
	•	Props (parameters) control dynamic output

Nested React Components
	•	Render inside-out based on component hierarchy

React.useState()
	•	Adds state to a functional component
	•	Returns: [value, setValue]

React Hooks – Purpose
	•	Let functional components use state, lifecycle, and context features

Common React Hooks
	•	State Hook (useState) – Manage component state
	•	Effect Hook (useEffect) – Run side effects (fetching, timers, subscriptions)
	•	Context Hook (useContext) – Access shared/global state
	•	Ref Hook (useRef) – Persist values without re-rendering / access DOM elements
	•	Performance Hooks – Optimize rendering (useMemo, useCallback)

⸻

React Router

Key Facts
	•	Enables client-side routing
	•	URL changes do not reload the page
	•	<Route> defines path → component mapping
	•	<Link> replaces <a> for navigation

⸻

Tooling & Configuration

package.json
	•	Defines:
	•	Project metadata
	•	Dependencies
	•	Scripts (start, dev, build)

Node.js
	•	Runs JavaScript outside the browser
	•	Used for servers, tooling, APIs

PM2
	•	Process manager for Node apps
	•	Keeps servers running, restarts on crash

Vite
	•	Front-end build tool
	•	Fast dev server + optimized production builds

⸻

Acronyms
	•	JSX: JavaScript XML
	•	JS: JavaScript
	•	AWS: Amazon Web Services
	•	NPM: Node Package Manager
	•	NVM: Node Version Manager

⸻

Exam Tips
	•	Watch for Promises vs actual values
	•	Pay attention to execution order (middleware, hooks)
	•	Know what runs server-side vs client-side
	•	Security questions = hash + salt + HTTPS
