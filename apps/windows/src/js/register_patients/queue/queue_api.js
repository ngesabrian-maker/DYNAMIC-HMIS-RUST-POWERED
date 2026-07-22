/* ==========================================
   API ENDPOINT
========================================== */

const API = "http://127.0.0.1:8000/api";

/* ==========================================
   SEARCH PATIENTS
========================================== */

export async function searchPatients(query) {

    if (!query.trim()) {
        return [];
    }

    const response = await fetch(
        `${API}/patients/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

}

/* ==========================================
   CREATE VISIT
========================================== */

export async function createVisit(visit) {

    const response = await fetch(
        `${API}/visits/register`,
        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(visit)

        }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

}

/* ==========================================
   LOAD TODAY'S QUEUE
========================================== */

export async function loadTodayQueue() {

    const response = await fetch(
        `${API}/queue/today`
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

}

/* ==========================================
   UPDATE VISIT STATUS
========================================== */

export async function updateVisitStatus(
    visitId,
    status
) {

    const response = await fetch(
        `${API}/queue/${visitId}/status`,
        {

            method: "PATCH",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                status

            })

        }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

}