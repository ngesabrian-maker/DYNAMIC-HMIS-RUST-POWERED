the expected json from the rest API... after writting your backend script you can test by use of get method http in this api http://127.0.0.1:8000/api/staff
[
    {
        "staff_id":1,
        "username":"admin",
        "first_name":"Brian",
        "last_name":"Ngesa",
        "email":"nges@gmail.com",
        "phone":"0712345678",
        "role":"superadmin",
        "status":"active"
    },
    {
        "staff_id":2,
        "username":"doctor1",
        "first_name":"John",
        "last_name":"Kamau",
        "email":"john@gmail.com",
        "phone":"0722000000",
        "role":"doctor",
        "status":"active"
    }
]

the add_staff.js that uses the post http method expect to send this json

{
    "first_name":"Brian",
    "last_name":"Ngesa",
    "email":"nges@gmail.com",
    "phone":"0712345678",
    "department":"Administration",
    "role":"doctor"
}

incase of success
{
    "success": true,
    "message": "Staff registered successfully."
}

incase of failure

{
    "success": false,
    "message": "Email already exists."
}