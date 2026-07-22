import { requireRole } from "../utils/authorize.js";
import { clearStaffCache } from "./staff_cache.js";
import { loadStaff } from "./staff_loader.js";

if (!requireRole("superadmin")) {

    throw new Error("Unauthorized");

}

const API = "http://127.0.0.1:8000/api/staff";

document
    .getElementById("staffForm")
    .addEventListener("submit", registerStaff);

/* ===========================================
   REGISTER STAFF
=========================================== */

async function registerStaff(event){

    event.preventDefault();

    const form = event.target;

    const payload = {

        first_name: form.first_name.value.trim(),

        last_name: form.last_name.value.trim(),

        username: form.username.value.trim(),

        email: form.email.value.trim(),

        phone: form.phone.value.trim(),

        role: form.role.value

    };

    /* ------------------------------
       Validation
    ------------------------------ */

    if(payload.first_name === ""){

        alert("First name is required.");

        return;

    }

    if(payload.last_name === ""){

        alert("Last name is required.");

        return;

    }

    if(payload.role === ""){

        alert("Please select a role.");

        return;

    }

try{

    const response = await fetch(API,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(payload)

    });

    const responseText = await response.text();

    console.log("====================================");
    console.log("HTTP Status :", response.status);
    console.log("Response    :", responseText);
    console.log("====================================");

    let result;

    try{

        result = JSON.parse(responseText);

    }

    catch{

        result = {

            success:false,

            message:responseText

        };

    }

    if(!response.ok){

        console.error("SERVER ERROR:", result);

        alert(result.message);

        return;

    }

    console.log("SUCCESS:", result);

    alert(result.message);

    form.reset();

  clearStaffCache();

await loadStaff(true);
}

catch(error){

    console.error("FETCH ERROR:", error);

    alert("Unable to communicate with server.");

}


}