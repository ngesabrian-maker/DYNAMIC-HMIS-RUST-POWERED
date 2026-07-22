import { checkSession, logout } from "./auth.js";
import { buildSidebar } from "./sidebar.js";
import { loadPage } from "./router.js";
import { initializeTheme } from "./theme.js";

console.log("app.js loaded");
// ==========================================
// Initialize application
// ==========================================

initializeTheme();

const user = checkSession();

// Display logged in staff

document.getElementById("current-user").textContent =
    user.first_name + " " + user.last_name;

document.getElementById("current-role").textContent =
    user.role;
document.getElementById("current-staff-id").textContent =
    user.staff_id;
// Build role menu

buildSidebar(user.role);

// Load default page

visit("dashboard");

loadPage("dashboard");

// Logout

document
    .getElementById("logout-btn")
    .addEventListener("click", logout);

// Footer buttons

document
    .getElementById("settings-btn")
    .addEventListener("click", () => loadPage("settings"));

document
    .getElementById("help-btn")
    .addEventListener("click", () => loadPage("help"));


    document.getElementById("app").addEventListener("click", (event) => {

    const card = event.target.closest("[data-page]");

    if (!card) return;

    loadPage(card.dataset.page);

});

import { visit, back, forward } from "./history.js";

document
.getElementById("app")
.addEventListener("click",(e)=>{

    const item = e.target.closest("[data-page]");

    if(!item) return;

    visit(item.dataset.page);

    loadPage(item.dataset.page);

});

document
.getElementById("back-btn")
.addEventListener("click",async()=>{

    const page = back();

    if(page){

        await loadPage(page);

    }

});

document
.getElementById("forward-btn")
.addEventListener("click",async()=>{

    const page = forward();

    if(page){

        await loadPage(page);

    }

});