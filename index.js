function foo() {
    alert("Foo was called!");
    document.getElementById("output").innerText = "Foo was called!";
}
// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault(); // stop page from reloading
      login(); // call your login function
    });
  });
  
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    alert("Username: " + user + "\nPassword: " + pass);
    document.getElementById("output").innerText =
    "Username: " + user + " | Password: " + pass;
}
