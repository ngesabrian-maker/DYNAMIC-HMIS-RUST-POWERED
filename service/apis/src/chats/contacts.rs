use actix_web::{
    get,
    web,
    HttpResponse,
    Responder,
};

use serde::Serialize;
use sqlx::{
    FromRow,
    MySqlPool,
};

/* ==========================================
   CONTACT
========================================== */

#[derive(Serialize, FromRow)]
pub struct Contact {

    pub staff_id: u32,

    pub first_name: String,

    pub last_name: String,

    pub role: String,

}

/* ==========================================
   LOAD CONTACTS
========================================== */

#[get("/api/chat/contacts/{staff_id}")]
pub async fn load_contacts(

    pool: web::Data<MySqlPool>,

    staff_id: web::Path<u32>,

) -> impl Responder {

    let staff_id = staff_id.into_inner();

    let sql = r#"

SELECT

    staff_id,

    first_name,

    last_name,

    role

FROM staff

WHERE

    staff_id <> ?

ORDER BY

    first_name,
    last_name;

"#;

    match sqlx::query_as::<_, Contact>(sql)

        .bind(staff_id)

        .fetch_all(pool.get_ref())

        .await

    {

        Ok(contacts) => {

            HttpResponse::Ok().json(contacts)

        }

        Err(err) => {

            eprintln!("Load contacts error: {}", err);

            HttpResponse::InternalServerError()
                .body("Failed to load contacts")

        }

    }

}