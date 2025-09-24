function foo() {
    alert("Foo was called!");
    document.getElementById("output").innerText = "Foo was called!";
}

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    alert("Username: " + user + "\nPassword: " + pass);
    document.getElementById("output").innerText =
    "Username: " + user + " | Password: " + pass;
}
