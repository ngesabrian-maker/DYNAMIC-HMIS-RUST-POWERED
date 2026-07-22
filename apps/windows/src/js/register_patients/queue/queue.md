# Queue Module Documentation

## Overview

The Queue Module is responsible for creating patient visits and managing the reception queue. It acts as the bridge between **Patient Registration** and the clinical workflow.

A patient **must already exist** in the `patients` table before they can be added to the queue.

The queue module **does not register patients**. Its sole responsibility is creating visit records and displaying the current queue.

---

# Workflow

```
Patient Registration
        │
        ▼
patients
        │
        ▼
Reception Queue
        │
        ▼
Search Existing Patient
        │
        ▼
Select Patient
        │
        ▼
Choose Visit Type
        │
        ▼
Choose Payment Mode
        │
        ▼
Create Visit
        │
        ▼
visits
        │
        ▼
Doctor Queue
        │
        ▼
Triage
        │
        ▼
Consultation
```

---

# Objectives

The module is responsible for:

* Searching registered patients.
* Selecting a patient.
* Creating a visit.
* Displaying today's queue.
* Tracking visit status.

The module should **never duplicate patient records**.

---

# Database Tables

## patients

Stores permanent patient demographic information.

Important fields include:

| Column        | Description        |
| ------------- | ------------------ |
| patient_id    | Primary key        |
| first_name    | Patient first name |
| last_name     | Patient surname    |
| gender        | Gender             |
| date_of_birth | Date of birth      |
| phone         | Contact number     |
| address       | Physical address   |

The patient remains in this table permanently.

---

## visits

Stores every hospital visit.

One patient can have many visits.

Example

```
Patient
--------
Brian

Visits

Visit 1
Visit 2
Visit 3
Visit 4
```

Current structure

| Column       | Description                          |
| ------------ | ------------------------------------ |
| visit_id     | Primary key                          |
| patient_id   | Foreign key to patients              |
| visit_type   | Consultation, Review, Emergency, etc |
| payment_mode | Cash, Insurance, SHA, Corporate      |
| visit_date   | Timestamp                            |
| status       | pending / triaged / completed        |
| created_at   | Timestamp                            |

---

# Queue Page Layout

The queue page contains four sections.

## 1. Search Patient

Purpose

Search existing patients.

Supported searches

* Patient ID
* First name
* Last name
* Phone number

The search should happen dynamically while typing.

---

## 2. Patient Results

Displays matching patients.

Example

```
-------------------------------------------------------
ID      Name              Gender      Phone
-------------------------------------------------------
12      Brian Ngesa       Male        0712345678
18      Jane Doe          Female      0700111222
-------------------------------------------------------
```

Each row has a **Select** button.

Selecting a patient stores the patient internally for visit creation.

---

## 3. Create Visit

Once a patient has been selected, reception records today's visit.

Required fields

### Visit Type

Examples

* Consultation
* Review
* Emergency
* Procedure
* Laboratory
* Pharmacy

### Payment Mode

Examples

* Cash
* Insurance
* SHA
* NHIF
* Corporate

After clicking

```
Add To Queue
```

a new record is inserted into the visits table.

---

## 4. Today's Queue

Displays every visit created today.

Example

```
-------------------------------------------------------------
No  Patient          Visit           Payment        Status
-------------------------------------------------------------
1   Brian Ngesa      Consultation    Cash           Pending
2   Jane Doe         Review          Insurance      Pending
3   John Mwangi      Emergency       Cash           Triaged
-------------------------------------------------------------
```

This table refreshes automatically after a visit is created.

---

# JavaScript Architecture

The queue module is split into four files.

---

## queue.js

Purpose

Initializes the queue page.

Responsibilities

* Initialize search
* Initialize visit form
* Load today's queue

---

## queue_api.js

Purpose

Communicates with the Rust backend.

Responsibilities

* Search patients
* Create visit
* Load today's queue
* Update visit status

This file contains all fetch requests.

---

## queue_search.js

Purpose

Acts as the controller.

Responsibilities

* Listen for typing
* Debounce searches
* Submit visit form
* Refresh queue
* Coordinate between API and renderer

---

## queue_renderer.js

Purpose

Updates the user interface.

Responsibilities

* Render patient search results
* Render queue table
* Store selected patient
* Clear visit form

The renderer should never communicate with the backend.

---

# Rust API

## Search Patients

```
GET /api/patients/search?q=
```

Purpose

Returns matching patients.

Example response

```json
[
    {
        "patient_id":1,
        "first_name":"Brian",
        "last_name":"Ngesa",
        "gender":"male",
        "phone":"0712345678"
    }
]
```

---

## Register Visit

```
POST /api/visits/register
```

Request

```json
{
    "patient_id":1,
    "visit_type":"Consultation",
    "payment_mode":"Cash"
}
```

Response

```json
{
    "success":true,
    "message":"Patient added to queue."
}
```

---

## Today's Queue

```
GET /api/queue/today
```

Returns

```json
[
    {
        "visit_id":12,
        "patient_id":1,
        "first_name":"Brian",
        "last_name":"Ngesa",
        "visit_type":"Consultation",
        "payment_mode":"Cash",
        "visit_date":"2026-07-22 10:14:25",
        "status":"pending"
    }
]
```

---

## Update Status

```
PATCH /api/queue/{visit_id}/status
```

Request

```json
{
    "status":"triaged"
}
```

Allowed values

* pending
* triaged
* completed

---

# Visit Lifecycle

Every visit follows the same lifecycle.

```
Pending
    │
    ▼
Triaged
    │
    ▼
Completed
```

Future versions may include additional states such as:

* Waiting Payment
* Laboratory
* Pharmacy
* Admitted
* Discharged

---

# Design Principles

The queue module follows several design principles.

## Separation of Concerns

Patient registration is independent from visit creation.

Patients are created once.

Visits are created every time the patient comes to hospital.

---

## One Patient — Many Visits

```
patients

Brian

Jane

John
```

```
visits

Brian
Visit 1

Brian
Visit 2

Brian
Visit 3
```

Patient information should never be duplicated.

---

## Fast Searching

Searching should be performed using indexed columns whenever possible.

Recommended searchable fields

* patient_id
* first_name
* last_name
* phone

---

## Performance

The queue module should only retrieve the data required for reception.

Avoid loading unnecessary patient records.

Always paginate or limit search results where appropriate.

---

## Maintainability

The module is intentionally divided into:

```
queue.js

queue_api.js

queue_search.js

queue_renderer.js
```

Each file has a single responsibility, making the system easier to maintain, extend, debug, and test.

---

# Future Enhancements

Potential future improvements include:

* Queue numbers.
* Queue priority for emergencies.
* Multiple reception desks.
* Appointment integration.
* Doctor-specific queues.
* Department-specific queues.
* Live queue updates using WebSockets.
* Automatic queue statistics.
* Queue waiting time estimation.
* Reception dashboard analytics.
* SMS notifications.
* Barcode or QR code patient lookup.
* Visit cancellation and reactivation.
* Visit history preview before adding to the queue.
* Duplicate visit detection to prevent multiple active visits for the same patient.

---

# Summary

The Queue Module is the operational entry point into the clinical workflow. It links registered patients to new visits while maintaining a clear separation between permanent patient demographics and encounter-specific information. This design supports scalability, minimizes data duplication, and provides a solid foundation for triage, consultation, laboratory, pharmacy, billing, and future clinical modules within the Hospital Information Management System.
