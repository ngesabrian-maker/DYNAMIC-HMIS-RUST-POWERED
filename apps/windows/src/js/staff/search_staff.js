import { requireRole } from "../utils/authorize.js";

if (!requireRole("superadmin")) {

    throw new Error("Unauthorized");

}

const searchInput = document.getElementById("staff_search");

const searchButton = document.getElementById("btnSearch");

searchInput.addEventListener("keyup", filterStaff);

searchButton.addEventListener("click", filterStaff);

function filterStaff() {

    const keyword = searchInput
        .value
        .trim()
        .toLowerCase();

    const rows = document.querySelectorAll("#staffTable tr");

    rows.forEach(row => {

        const text = row.textContent.toLowerCase();

        if (text.includes(keyword)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}