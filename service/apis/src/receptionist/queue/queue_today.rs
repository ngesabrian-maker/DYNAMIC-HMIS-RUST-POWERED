use actix_web::{
    get,
    web,
    HttpResponse,
    Responder,
};

use chrono::NaiveDateTime;

use serde::Serialize;

use sqlx::{
    FromRow,
    MySqlPool,
};

/* ==========================================
   QUEUE ROW
========================================== */

#[derive(Debug, Serialize, FromRow)]
pub struct QueueRow {

    pub visit_id: u32,

    pub patient_id: u32,

    pub first_name: String,

    pub last_name: String,

    pub visit_type: String,

    pub payment_mode: String,

    pub visit_date: NaiveDateTime,

    pub status: String,

}

/* ==========================================
   TODAY'S QUEUE
========================================== */

#[get("api/queue/today")]
async fn today_queue(

    pool: web::Data<MySqlPool>,

) -> impl Responder {

    let queue = sqlx::query_as::<_, QueueRow>(
        r#"

        SELECT

            v.visit_id,

            p.patient_id,

            p.first_name,

            p.last_name,

            v.visit_type,

            v.payment_mode,

            v.visit_date,

            v.status

        FROM visits v

        INNER JOIN patients p

            ON p.patient_id = v.patient_id

        WHERE

            DATE(v.visit_date) = CURDATE()

        ORDER BY

            v.visit_date ASC

        "#
    )

    .fetch_all(pool.get_ref())

    .await;

    match queue {

        Ok(rows) => {

            HttpResponse::Ok().json(rows)

        }

        Err(error) => {

            eprintln!("Queue Error: {:?}", error);

            HttpResponse::InternalServerError().body(
                "Failed to load today's queue."
            )

        }

    }

}
