const { invoke } = window.__TAURI__.core;



const loginButton = document.getElementById("login-btn");

loginButton.addEventListener("click", () => {
    window.location.href = "/pages/login.html";
});