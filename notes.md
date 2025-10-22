# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>




📘 CS 260 Web Programming — Midterm Notes
🧱 HTML BASICS
Structure
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
Tags & Purpose
Tag	Purpose
<link>	Links external resources (like CSS) to the document. Placed in <head>.
<div>	Defines a block-level container (no semantic meaning). Groups elements for CSS/JS.
<span>	Inline container (no line break). Used to style part of text. Default display: inline.
<p>	Paragraph
<ol> / <ul>	Ordered / Unordered list
<li>	List item
<h1>–<h6>	Headings (1 = largest)
<img src="path" alt="desc">	Displays an image
<a href="https://...">	Hyperlink (can wrap images)
<script>	Embeds or links JavaScript
<style>	Inline CSS in HTML
Image + Hyperlink Example:
<a href="https://byu.edu">
  <img src="byu-logo.png" alt="BYU Logo">
</a>
Declare HTML Document:
<!DOCTYPE html>
🎨 CSS BASICS
Selectors
Selector	Example	Description
ID	#title	Targets element with id="title"
Class	.grid	Targets all elements with class="grid"
Element	div	Targets all divs
Descendant	div p	Targets <p> inside <div>
Child	div > p	Targets direct child <p> of <div>
Box Model (inside → outside)
content → padding → border → margin
Padding = space inside border, between content and border
Margin = space outside border, between element and neighbors
Example:
div {
  padding: 10px; /* inside */
  margin: 5px;   /* outside */
}
Common CSS Rules
div { background-color: red; } /* all divs red */
#title { color: blue; }         /* ID selector */
.grid { display: grid; }        /* class selector */
span { display: inline; }       /* default */
Display / Flex / Grid
.container {
  display: flex;
  justify-content: center; /* horizontal alignment */
  align-items: center;     /* vertical alignment */
}
Flex Example:
.container {
  display: flex;
  flex-direction: row; /* images side by side */
}
⚙️ JAVASCRIPT BASICS
Syntax
if (condition) { ... } 
else if (other) { ... } 
else { ... }

for (let i = 0; i < 5; i++) { console.log(i); }

while (x < 5) { x++; }

switch (fruit) {
  case 'apple': console.log('apple'); break;
  default: console.log('other');
}
Functions
function add(x, y) { return x + y; }

// Arrow function
const add = (x, y) => x + y;
Objects
const person = { name: "Jacob", age: 23 };
person.height = 180; // ✅ can add new properties
Arrays
const arr = [1, 2, 3];
arr.map(x => x * 2); // [2, 4, 6]
DOM Manipulation
const el = document.getElementById('byu');
el.style.color = 'green'; // change text color

document.querySelector('#byu'); // selects by CSS selector
document.querySelectorAll('.grid'); // all with class grid

el.addEventListener('click', () => console.log('clicked'));
Example:
document.getElementById('animal').textContent = 'crow';
JSON
JavaScript Object Notation
Text-based data format (key/value)
Example:
const obj = { name: "Alice" };
const json = JSON.stringify(obj); // object → string
const parsed = JSON.parse(json);  // string → object
⏱ PROMISES
const promise = new Promise((resolve, reject) => {
  resolve('done');
});

promise.then(result => console.log(result)); // "done"
fetch('data.json')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
💻 TERMINAL COMMANDS
Command	Description
pwd	Print working directory
cd <dir>	Change directory
ls	List files
ls -la	List all files (including hidden) with details
mkdir <name>	Create directory
rm <file>	Remove file
mv <src> <dest>	Move or rename
chmod	Change file permissions
vim, nano	Text editors
man <cmd>	Manual for command
ssh user@host	Start remote shell session
wget <url>	Download file
sudo	Run command as superuser
ps	Show running processes
🌐 NETWORK / DNS / PORTS
Concept	Description
Domain	banana.fruit.bozo.click
- TLD (Top Level Domain)	click
- Root Domain	bozo.click
- Subdomain	banana.fruit
HTTPS	Requires SSL/TLS certificate ✅
DNS A Record	Maps domain → IP address (can point to IP or another A record)
Common Ports
Port	Protocol
80	HTTP
443	HTTPS
22	SSH
🧩 MISC PRACTICE OUTPUTS
For Loop Example
for (let i = 0; i < 3; i++) console.log(i);
// Output: 0 1 2
getElementById + Event
document.getElementById('foo')
  .addEventListener('click', () => console.log('clicked'));
Padding Example
div { padding: 10px 20px; }
/* top/bottom = 10px, left/right = 20px */
Change Only “trouble” to Green
<p><span class="trouble">trouble</span>double</p>
.trouble { color: green; }
🧭 Quick Reference Summary
#id = unique element selector
.class = reusable style selector
padding = inside space; margin = outside
span = inline; div = block
Box model = content → padding → border → margin
JSON = data format (text representation of JS objects)
Promises = async operations with .then() and .catch()
Port 80 = HTTP, 443 = HTTPS, 22 = SSH
HTTPS requires certificate
ls -la = shows all files in long format
You can add new properties to JS objects dynamically

```


cd ~/Library/Mobile\ Documents/com\~apple\~CloudDocs/

