import { requireRole } from "../utils/authorize.js";
import { getStaff } from "./staff_cache.js";

console.log("staff_loader.js imported");
if (!requireRole("superadmin")) {

    throw new Error("Unauthorized");

}

console.log("staff_loader loaded");

loadStaff();
/* ===========================================
   LOAD SUMMARY
=========================================== */

export async function loadStaff(forceRefresh = false) {

    const data = await getStaff(forceRefresh);

    document.getElementById("staff_total").textContent =
        data.summary.total;

    document.getElementById("staff_active").textContent =
        data.summary.active;

    document.getElementById("staff_inactive").textContent =
        data.summary.inactive;

    document.getElementById("staff_admins").textContent =
        data.summary.admins;

    renderTable(data.staff);

}
/* ===========================================
   RENDER TABLE
=========================================== */

function renderTable(staff){

    const tbody = document.getElementById("staffTable");

    tbody.innerHTML = "";

    if(staff.length === 0){

        tbody.innerHTML = `

            <tr>

                <td colspan="8">

                    No staff found.

                </td>

            </tr>

        `;

        return;

    }

    staff.forEach(user => {

        tbody.innerHTML += `

        <tr>

            <td>${user.staff_id}</td>

            <td>${user.first_name} ${user.last_name}</td>

            <td>${user.role}</td>

            <td>-</td>

            <td>${user.phone ?? ""}</td>

            <td>${user.email ?? ""}</td>

            <td>

                <span class="status ${user.status}">

                    ${user.status}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="btn-edit"
                        data-id="${user.staff_id}">

                        Edit

                    </button>

                    <button
                        class="btn-reset"
                        data-id="${user.staff_id}">

                        Reset Password

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}