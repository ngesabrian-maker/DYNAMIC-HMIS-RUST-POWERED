use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct AddStaffRequest {
    pub staff_id: Option<i32>,

    pub username: String,

    pub first_name: String,

    pub last_name: String,

    pub email: Option<String>,

    pub phone: Option<String>,

    pub role: String,

}

#[derive(Debug, Serialize)]
pub struct ApiResponse {

    pub success: bool,

    pub message: String,

}