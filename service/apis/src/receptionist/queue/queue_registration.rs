use actix_web::{
    post,
    web,
    HttpResponse,
    Responder,
};

use serde::{
    Deserialize,
    Serialize,
};

use sqlx::MySqlPool;

/* ==========================================
   REQUEST
========================================== */

#[derive(Debug, Deserialize)]
pub struct RegisterVisitRequest {

    pub patient_id: i32,

    pub visit_type: String,

    pub payment_mode: String,

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
   REGISTER VISIT
========================================== */

#[post("api/visits/register")]
async fn register_visit(

    pool: web::Data<MySqlPool>,

    visit: web::Json<RegisterVisitRequest>,

) -> impl Responder {

    /* --------------------------------------
       Check Patient Exists
    --------------------------------------- */

    let patient_exists = sqlx::query_scalar::<_, i32>(
        r#"
        SELECT COUNT(*)
        FROM patients
        WHERE patient_id = ?
        "#
    )
    .bind(visit.patient_id)
    .fetch_one(pool.get_ref())
    .await;

    let patient_exists = match patient_exists {

        Ok(count) => count,

        Err(error) => {

            eprintln!("{:?}", error);

            return HttpResponse::InternalServerError().json(ApiResponse {

                success: false,

                message: "Database error.".to_string(),

            });

        }

    };

    if patient_exists == 0 {

        return HttpResponse::BadRequest().json(ApiResponse {

            success: false,

            message: "Patient does not exist.".to_string(),

        });

    }

    /* --------------------------------------
       Prevent Duplicate Active Visit
    --------------------------------------- */

    let active_visit = sqlx::query_scalar::<_, i32>(
        r#"
        SELECT COUNT(*)

        FROM visits

        WHERE

            patient_id = ?

        AND

            status != 'completed'
        "#
    )
    .bind(visit.patient_id)
    .fetch_one(pool.get_ref())
    .await;

    let active_visit = match active_visit {

        Ok(count) => count,

        Err(error) => {

            eprintln!("{:?}", error);

            return HttpResponse::InternalServerError().json(ApiResponse {

                success: false,

                message: "Database error.".to_string(),

            });

        }

    };

    if active_visit > 0 {

        return HttpResponse::BadRequest().json(ApiResponse {

            success: false,

            message: "Patient already has an active visit.".to_string(),

        });

    }

    /* --------------------------------------
       Insert Visit
    --------------------------------------- */

    let result = sqlx::query(
        r#"
        INSERT INTO visits
        (

            patient_id,

            visit_type,

            payment_mode

        )

        VALUES

        (

            ?,

            ?,

            ?

        )
        "#
    )

    .bind(visit.patient_id)

    .bind(&visit.visit_type)

    .bind(&visit.payment_mode)

    .execute(pool.get_ref())

    .await;

    match result {

        Ok(_) => {

            HttpResponse::Ok().json(ApiResponse {

                success: true,

                message: "Patient added to queue.".to_string(),

            })

        }

        Err(error) => {

            eprintln!("{:?}", error);

            HttpResponse::InternalServerError().json(ApiResponse {

                success: false,

                message: "Failed to register visit.".to_string(),

            })

        }

    }

}

