use actix_web::{
    get,
    web,
    HttpResponse,
    Responder,
};

use serde::{
    Deserialize,
    Serialize,
};

use sqlx::{
    FromRow,
    MySqlPool,
};

/* ==========================================
   SEARCH QUERY
========================================== */

#[derive(Deserialize)]
pub struct SearchQuery {

    pub q: String,

}

/* ==========================================
   PATIENT SEARCH RESULT
========================================== */

#[derive(Serialize, FromRow)]
pub struct PatientSearchResult {

    pub patient_id: u32,

    pub first_name: String,

    pub last_name: String,

    pub gender: String,

    pub phone: Option<String>,

}

/* ==========================================
   SEARCH PATIENTS
========================================== */

#[get("api/patients/search")]
async fn search_patients(

    pool: web::Data<MySqlPool>,

    query: web::Query<SearchQuery>,

) -> impl Responder {

    let search = format!("%{}%", query.q.trim());

    let patients = sqlx::query_as::<_, PatientSearchResult>(
        r#"
        SELECT

            patient_id,
            first_name,
            last_name,
            gender,
            phone

        FROM patients

        WHERE

            first_name LIKE ?

        OR

            last_name LIKE ?

        OR

            phone LIKE ?

        OR

            CAST(patient_id AS CHAR) LIKE ?

        ORDER BY

            first_name ASC,
            last_name ASC

        LIMIT 20
        "#
    )

    .bind(&search)
    .bind(&search)
    .bind(&search)
    .bind(&search)

    .fetch_all(pool.get_ref())

    .await;

    match patients {

        Ok(results) => {

            HttpResponse::Ok().json(results)

        }

        Err(error) => {

            eprintln!("Patient Search Error: {:?}", error);

            HttpResponse::InternalServerError().body(
                "Failed to search patients."
            )

        }

    }

}
