export const menus = {

    superadmin: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "👥 Staff", route: "staff" },
        { text: "👤 Patients", route: "patients" },
        { text: "📅 Appointments", route: "appointments" },
        { text: "🛏 Admissions", route: "admissions" },
        { text: "💰 Billing", route: "billing" },
        { text: "🧪 Laboratory", route: "laboratory" },
        { text: "🩻 Radiology", route: "radiology" },
        { text: "💊 Pharmacy", route: "pharmacy" },
        { text: "📦 Inventory", route: "inventory" },
        { text: "📈 Reports", route: "reports" },
        { text: "⚙ Administration", route: "administration" }

    ],

    doctor: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "👤 Patients", route: "patients" },
        { text: "🩺 Consultation", route: "consultation" },
        { text: "💊 Prescriptions", route: "prescriptions" },
        { text: "🧪 Laboratory Requests", route: "laboratory" },
        { text: "🩻 Radiology Requests", route: "radiology" },
        { text: "📋 Medical Records", route: "records" },
        { text: "📈 Reports", route: "reports" }

    ],

    nurse: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "👤 Patients", route: "patients" },
        { text: "🩺 Triage", route: "triage" },
        { text: "🛏 Ward", route: "ward" },
        { text: "💉 Nursing Notes", route: "nursing" },
        { text: "📋 Vitals", route: "vitals" }

    ],

    receptionist: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "📝 Register Patient", route: "registration" },
        { text: "🚶 Queue", route: "queue" },
        { text: "👤 Patients", route: "patients" },
        { text: "📊 Daily Report", route: "receptionist_report" },
        { text: "📅 Appointments", route: "appointments" }
        

    ],

    cashier: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "👥 Consultation", route: "consultation_bill" },
        { text: "🧪  laboratory", route: "lab_bill" },
        { text: "💊 Pharmacy", route: "pharmacy_bill" },
        { text: "🩻 Imaging", route: "imaging_bill" },
        { text: "💊 OTC", route: "otc_bill" },
        { text: "💳 Payments", route: "payments" },
        { text: "🧾 Receipts", route: "receipts" },
        { text: "📈 Daily Summary", route: "cash_report" }

    ],

    LABTECH: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "🧪 Laboratory Queue", route: "laboratory" },
        { text: "🔬 Results Entry", route: "results" },
        { text: "📋 Specimens", route: "specimens" },
        { text: "📈 Reports", route: "reports" }

    ],

    RADIOGRAPHER: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "🩻 Imaging Queue", route: "radiology" },
        { text: "📷 Image Capture", route: "capture" },
        { text: "📝 Reports", route: "reports" }

    ],

    PHARMTECH: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "💊 Prescriptions", route: "prescriptions" },
        { text: "📦 Drug Inventory", route: "inventory" },
        { text: "💉 Dispense Medication", route: "dispense" },
        { text: "📈 Pharmacy Reports", route: "reports" }

    ],

    ACCOUNTANT: [

        { text: "🏠 Dashboard", route: "dashboard" },
        { text: "💰 Financial Reports", route: "finance" },
        { text: "📊 Revenue", route: "revenue" },
        { text: "💳 Payments", route: "payments" },
        { text: "🧾 Invoices", route: "invoices" },
        { text: "📈 Accounting Reports", route: "reports" }

    ]

};