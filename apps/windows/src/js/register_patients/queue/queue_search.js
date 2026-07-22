/* ==========================================
   API
========================================== */

import {

    searchPatients,
    createVisit,
    loadTodayQueue

} from "./queue_api.js";

/* ==========================================
   RENDERER
========================================== */

import {

    renderPatientResults,
    renderQueue,
    clearVisitForm,
    getSelectedPatient

} from "./queue_renderer.js";

/* ==========================================
   SEARCH TIMER
========================================== */

let searchTimer = null;

/* ==========================================
   INITIALIZE SEARCH
========================================== */

export function initQueueSearch() {

    const searchInput =
        document.getElementById("search_patient");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        clearTimeout(searchTimer);

        const query = searchInput.value.trim();

        searchTimer = setTimeout(async () => {

            try {

                const patients =
                    await searchPatients(query);

                renderPatientResults(patients);

            }

            catch (err) {

                console.error(err);

            }

        }, 300);

    });

}

/* ==========================================
   LOAD TODAY'S QUEUE
========================================== */

export async function refreshQueue() {

    try {

        const queue =
            await loadTodayQueue();

        renderQueue(queue);

    }

    catch (err) {

        console.error(err);

    }

}

/* ==========================================
   CREATE VISIT
========================================== */

export function initVisitForm() {

    const form =
        document.getElementById("visitForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const patient =
            getSelectedPatient();

        if (!patient) {

            alert("Please select a patient.");

            return;

        }

        const visit = {

            patient_id: patient.patient_id,

            visit_type:
                document.getElementById("visit_type").value,

            payment_mode:
                document.getElementById("payment_mode").value

        };

        try {

            const response =
                await createVisit(visit);

            alert(response.message);

            clearVisitForm();

            await refreshQueue();

        }

        catch (err) {

            console.error(err);

            alert("Failed to add patient to queue.");

        }

    });

}