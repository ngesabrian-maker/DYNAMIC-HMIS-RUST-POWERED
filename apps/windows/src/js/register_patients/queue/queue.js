/* ==========================================
   QUEUE MODULE
========================================== */

console.log("queue.js loaded");

/* ==========================================
   IMPORTS
========================================== */

import {

    initQueueSearch,
    initVisitForm,
    refreshQueue

} from "./queue_search.js";

/* ==========================================
   INITIALIZE QUEUE PAGE
========================================== */

export async function initQueue() {

    console.log("Initializing Queue Module...");

    initQueueSearch();

    initVisitForm();

    await refreshQueue();

    console.log("Queue Module Ready.");

}

/* ==========================================
   END
========================================== */