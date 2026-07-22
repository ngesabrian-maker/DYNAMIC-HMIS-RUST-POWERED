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
   STAFF ROW
========================================== */

#[derive(Serialize, FromRow)]
pub struct StaffRow {

    pub staff_id: u32,

    pub username: String,

    pub first_name: String,

    pub last_name: String,

    pub email: Option<String>,

    pub phone: Option<String>,

    pub role: String,

    pub status: String,

}

/* ==========================================
   SUMMARY
========================================== */

#[derive(Serialize)]
pub struct StaffSummary {

    pub total: i64,

    pub active: i64,

    pub inactive: i64,

    pub admins: i64,

}

/* ==========================================
   RESPONSE
========================================== */

#[derive(Serialize)]
pub struct LoadStaffResponse {

    pub success: bool,

    pub summary: StaffSummary,

    pub staff: Vec<StaffRow>,

}

/* ==========================================
   LOAD STAFF
========================================== */

#[get("")]
pub async fn load_staff(

    pool: web::Data<MySqlPool>,

) -> impl Responder {

    eprintln!("========================================");
    eprintln!("LOAD STAFF ENDPOINT");
    eprintln!("========================================");

    let staff = sqlx::query_as::<_, StaffRow>(
        r#"
        SELECT

            staff_id,
            username,
            first_name,
            last_name,
            email,
            phone,
            role,
            status

        FROM staff

        ORDER BY first_name, last_name
        "#
    )
    .fetch_all(pool.get_ref())
    .await;

    match staff {

        Ok(rows) => {

            let total = rows.len() as i64;

            let active = rows
                .iter()
                .filter(|staff| staff.status == "active")
                .count() as i64;

            let inactive = rows
                .iter()
                .filter(|staff| staff.status == "inactive")
                .count() as i64;

            let admins = rows
                .iter()
                .filter(|staff| {

                    staff.role == "superadmin"
                        || staff.role == "admin"

                })
                .count() as i64;

            eprintln!("Summary");
            eprintln!("Total      : {}", total);
            eprintln!("Active     : {}", active);
            eprintln!("Inactive   : {}", inactive);
            eprintln!("Admins     : {}", admins);

            eprintln!("Loaded {} staff records", rows.len());

            HttpResponse::Ok().json(

                LoadStaffResponse {

                    success: true,

                    summary: StaffSummary {

                        total,

                        active,

                        inactive,

                        admins,

                    },

                    staff: rows,

                }

            )

        }

        Err(error) => {

            eprintln!("========================================");
            eprintln!("LOAD STAFF FAILED");
            eprintln!("{:#?}", error);
            eprintln!("========================================");

            HttpResponse::InternalServerError().json(

                serde_json::json!({

                    "success": false,

                    "message": error.to_string()

                })

            )

        }

    }

}