import { requireRole } from "../utils/authorize.js";

if (!requireRole("superadmin")) {

    throw new Error("Unauthorized");

}

const staffForm = document.getElementById("staffForm");

const btnSaveStaff = document.getElementById("btnSaveStaff");

let editingStaffId = null;

/* =====================================================
   Called by the Edit button in the staff table
===================================================== */

window.editStaff = function (staff) {

    editingStaffId = staff.staff_id;

    staffForm.first_name.value = staff.first_name;

    staffForm.last_name.value = staff.last_name;

    staffForm.username.value = staff.username;

    staffForm.email.value = staff.email ?? "";

    staffForm.phone.value = staff.phone ?? "";

    staffForm.role.value = staff.role;

    btnSaveStaff.textContent = "Update Staff";

    staffForm.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

};

/* =====================================================
   Returns true if editing
===================================================== */

export function isEditing() {

    return editingStaffId !== null;

}

/* =====================================================
   Returns current editing id
===================================================== */

export function getEditingStaffId() {

    return editingStaffId;

}

/* =====================================================
   Clear edit mode
===================================================== */

export function clearEditing() {

    editingStaffId = null;

    staffForm.reset();

    btnSaveStaff.textContent = "Register Staff";

}