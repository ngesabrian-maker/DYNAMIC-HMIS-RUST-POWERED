use actix_web::{
    patch,
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
pub struct UpdateQueueStatusRequest {

    pub status: String,

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
   UPDATE STATUS
========================================== */

#[patch("/queue/{visit_id}/status")]
async fn update_queue_status(

    pool: web::Data<MySqlPool>,

    path: web::Path<u32>,

    request: web::Json<UpdateQueueStatusRequest>,

) -> impl Responder {

    let visit_id = path.into_inner();

    /* --------------------------------------
       Validate Status
    --------------------------------------- */

    let valid_status = matches!(
        request.status.as_str(),
        "pending" | "triaged" | "completed"
    );

    if !valid_status {

        return HttpResponse::BadRequest().json(ApiResponse {

            success: false,

            message: "Invalid visit status.".to_string(),

        });

    }

    /* --------------------------------------
       Update Visit
    --------------------------------------- */

    let result = sqlx::query(
        r#"
        UPDATE visits

        SET status = ?

        WHERE visit_id = ?
        "#
    )

    .bind(&request.status)

    .bind(visit_id)

    .execute(pool.get_ref())

    .await;

    match result {

        Ok(result) => {

            if result.rows_affected() == 0 {

                return HttpResponse::NotFound().json(ApiResponse {

                    success: false,

                    message: "Visit not found.".to_string(),

                });

            }

            HttpResponse::Ok().json(ApiResponse {

                success: true,

                message: "Queue status updated.".to_string(),

            })

        }

        Err(error) => {

            eprintln!("Update Status Error: {:?}", error);

            HttpResponse::InternalServerError().json(ApiResponse {

                success: false,

                message: "Failed to update queue status.".to_string(),

            })

        }

    }

}
