
import { registerPatient } from "./api_patients.js";

export function initRegisterPatient() {

console.log("initRegisterPatient called");

    const form = document.getElementById("patientRegForm");

    console.log("Form:", form);

    if (!form) {
        console.error("patientForm not found!");
        return;
    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const patient = {

            first_name: document.getElementById("first_name").value.trim(),
            last_name: document.getElementById("last_name").value.trim(),
            gender: document.getElementById("gender").value,
            date_of_birth: document.getElementById("date_of_birth").value,
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim()

        };

        try {

            const result = await registerPatient(patient);

            alert(result.message);

            form.reset();

        } catch (err) {

            console.error(err);

            alert("Failed to register patient.");

        }

    });

}