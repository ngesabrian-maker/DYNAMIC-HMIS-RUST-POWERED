import { checkSession, logout } from "./auth.js";
import { buildSidebar } from "./sidebar.js";
import { loadPage } from "./router.js";
import "./chat.js";
import { initializeTheme, enableDarkMode, enableLightMode } from "./theme.js";

initializeTheme();
const user = checkSession();

document.getElementById("current-user").textContent =
    `Welcome, ${user.fullName}`;

buildSidebar(user.role);

loadPage("dashboard");

document
    .getElementById("logout-btn")
    .addEventListener("click", logout);

    // Footer Navigation

document.getElementById("settings-btn")
    .addEventListener("click", () => loadPage("settings"));

document.getElementById("help-btn")
    .addEventListener("click", () => loadPage("help"));

document.getElementById("logout-btn")
    .addEventListener("click", logout);