/* ==========================================
   SELECTED PATIENT
========================================== */

let selectedPatient = null;

/* ==========================================
   GET SELECTED PATIENT
========================================== */

export function getSelectedPatient() {

    return selectedPatient;

}

/* ==========================================
   CLEAR SEARCH RESULTS
========================================== */

export function clearPatientResults() {

    document.querySelector("#patientResults tbody").innerHTML = "";

}

/* ==========================================
   RENDER PATIENT SEARCH RESULTS
========================================== */

export function renderPatientResults(patients) {

    const tbody = document.querySelector("#patientResults tbody");

    tbody.innerHTML = "";

    if (!patients.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    No patients found.
                </td>
            </tr>
        `;

        return;

    }

    patients.forEach(patient => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${patient.patient_id}</td>

            <td>

                ${patient.first_name}
                ${patient.last_name}

            </td>

            <td>${patient.gender}</td>

            <td>${patient.phone ?? ""}</td>

            <td>

                <button
                    class="btn btn-primary btn-sm">

                    Select

                </button>

            </td>

        `;

        row
            .querySelector("button")
            .addEventListener("click", () => {

                selectedPatient = patient;

                document.getElementById("patient_id").value =
                    patient.patient_id;

                document.getElementById("selected_patient").value =
                    `${patient.first_name} ${patient.last_name}`;

            });

        tbody.appendChild(row);

    });

}

/* ==========================================
   RENDER TODAY'S QUEUE
========================================== */

export function renderQueue(queue) {

    const tbody = document.querySelector("#queueTable tbody");

    tbody.innerHTML = "";

    if (!queue.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Queue is empty.
                </td>
            </tr>
        `;

        return;

    }

    queue.forEach((visit, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>

                ${visit.first_name}
                ${visit.last_name}

            </td>

            <td>

                ${visit.visit_type}

            </td>

            <td>

                ${visit.payment_mode}

            </td>

            <td>

                ${visit.visit_date}

            </td>

            <td>

                ${visit.status}

            </td>

        `;

        tbody.appendChild(row);

    });

}

/* ==========================================
   CLEAR VISIT FORM
========================================== */

export function clearVisitForm() {

    selectedPatient = null;

    document.getElementById("visitForm").reset();

    document.getElementById("patient_id").value = "";

    document.getElementById("selected_patient").value = "";

}