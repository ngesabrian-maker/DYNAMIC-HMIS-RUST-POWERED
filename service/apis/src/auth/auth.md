POST /api/auth/login
        │
        ▼
Validate JSON
        │
        ▼
Find email in staff table
        │
        ▼
Email exists?
       / \
     No   Yes
     │      │
401       Verify password
              │
         Password OK?
            /     \
          No      Yes
          │         │
        401    Generate JWT
                    │
                    ▼
             Return JSON


dto contains the json struct while auth.rs contains the login functions that interactw with mysql database
