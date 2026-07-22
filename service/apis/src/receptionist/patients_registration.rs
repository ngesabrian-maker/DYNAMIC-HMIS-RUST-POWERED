use actix_web::{
    post,
    web,
    HttpResponse,
    Responder,
};

use chrono::Utc;

use serde::{
    Deserialize,
    Serialize,
};

use sqlx::MySqlPool;

/* ==========================================
   REQUEST
========================================== */

#[derive(Debug, Deserialize)]
pub struct RegisterPatientRequest {

    pub first_name: String,
    pub last_name: String,
    pub gender: String,
    pub date_of_birth: String,
    pub phone: Option<String>,
    pub address: Option<String>,

}

/* ==========================================
   RESPONSE
========================================== */

#[derive(Debug, Serialize)]
pub struct ApiResponse {

    pub success: bool,
    pub message: String,

}

/* ==========================================
   REGISTER PATIENT
========================================== */

#[post("api/patients/register")]
pub async fn register_patient(

    pool: web::Data<MySqlPool>,
    patient: web::Json<RegisterPatientRequest>,

) -> impl Responder {

    
    /* --------------------------------------
       Insert Patient
    --------------------------------------- */

    let result = sqlx::query(
        r#"
        INSERT INTO patients
        (
            first_name,
            last_name,
            gender,
            date_of_birth,
            phone,
            address
        )
        VALUES
        ( ?, ?, ?, ?, ?, ?)
        "#
    )
    .bind(&patient.first_name)
    .bind(&patient.last_name)
    .bind(&patient.gender)
    .bind(&patient.date_of_birth)
    .bind(&patient.phone)
    .bind(&patient.address)
    .execute(pool.get_ref())
    .await;

    match result {

        Ok(_) => {

            HttpResponse::Ok().json(ApiResponse {

                success: true,
                message: format!(
                    "Patient registered successfully."
                ),

            })

        }

        Err(err) => {

            eprintln!("Insert Error: {:?}", err);

            HttpResponse::InternalServerError().json(ApiResponse {

                success: false,
                message: "Failed to register patient.".to_string(),

            })

        }

    }

}