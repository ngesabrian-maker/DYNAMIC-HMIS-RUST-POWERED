const app = document.getElementById("app");

export async function loadPage(page) {

    try {

        const response = await fetch(`/pages/${page}.html`);

        if (!response.ok) {

            throw new Error("Page not found");

        }

        app.innerHTML = await response.text();

        // Initialize page-specific JavaScript
        await initializePage(page);

    } catch (error) {

        app.innerHTML = `
            <div class="page">
                <h2>404</h2>
                <p>${error.message}</p>
            </div>
        `;

    }

}

async function initializePage(page) {

    switch (page) {

        /* ======================================
           DASHBOARD
        ======================================= */

        case "dashboard":
            break;

        /* ======================================
           STAFF
        ======================================= */

        case "staff":

            const staff = await import("./staff/staff_loader.js");

            await staff.loadStaff();

            await import("./staff/add_staff.js");

            await import("./staff/edit_staff.js");

            await import("./staff/search_staff.js");

            break;

        /* ======================================
           RECEPTION
        ======================================= */

        case "reception":

            // await import("./reception/reception_loader.js");

            break;

        /* ======================================
           DOCTOR
        ======================================= */

        case "doctor":

            // await import("./doctor/doctor_loader.js");

            break;

        /* ======================================
           LAB
        ======================================= */

        case "lab":

            // await import("./lab/lab_loader.js");

            break;

        /* ======================================
           PHARMACY
        ======================================= */

        case "pharmacy":

            // await import("./pharmacy/pharmacy_loader.js");

            break;

        case "registration":

            await import("./register_patients/patients.js");

            break;
   
        case "queue": {

            const queue = await import("./register_patients/queue/queue.js");

            await queue.initQueue();

            break;

}
    }

}