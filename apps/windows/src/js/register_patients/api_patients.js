const API = "http://127.0.0.1:8000/api/patients";

export async function registerPatient(patient) {

console.log("registerPatient called with");

    const res = await fetch(`${API}/register`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(patient)

    });

    if (!res.ok) {

        throw new Error(`HTTP ${res.status}`);

    }

    return await res.json();

}