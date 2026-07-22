use actix_web::{
    post,
    web,
    HttpResponse,
    Responder,
};

use sqlx::{
    MySqlPool,
    Error,
};

use crate::administrator::staff::dto::{
    AddStaffRequest,
    ApiResponse,
};

// Precomputed bcrypt hash for:
// ChangeMe123
const DEFAULT_PASSWORD_HASH: &str =
    "$2b$12$cgBQJRNYysDYydiVFDIlfOtSwp1Blmr9yM1IMZKccIWqD4kncL8DS";

#[post("")]
pub async fn add_staff(

    pool: web::Data<MySqlPool>,

    body: web::Json<AddStaffRequest>,

) -> impl Responder {

    eprintln!("=================================================");
    eprintln!("ADD STAFF");
    eprintln!("=================================================");

    eprintln!("Username : {}", body.username);
    eprintln!("Name     : {} {}", body.first_name, body.last_name);
    eprintln!("Role     : {}", body.role);

    let result = sqlx::query(
        r#"
        INSERT INTO staff
        (
            username,
            email,
            phone,
            password_hash,
            first_name,
            last_name,
            role
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
        "#
    )
    .bind(&body.username)
    .bind(&body.email)
    .bind(&body.phone)
    .bind(DEFAULT_PASSWORD_HASH)
    .bind(&body.first_name)
    .bind(&body.last_name)
    .bind(&body.role)
    .execute(pool.get_ref())
    .await;

    match result {

        Ok(result) => {

            eprintln!("Staff created successfully.");
            eprintln!("Rows affected : {}", result.rows_affected());
            eprintln!("Insert ID     : {}", result.last_insert_id());

            HttpResponse::Ok().json(
                ApiResponse {
                    success: true,
                    message: "Staff registered successfully".into(),
                }
            )

        }

        Err(Error::Database(db_error)) => {

            if db_error.code().as_deref() == Some("1062") {

                return HttpResponse::BadRequest().json(
                    ApiResponse {
                        success: false,
                        message: "Username already exists".into(),
                    }
                );

            }

            eprintln!("DATABASE ERROR");
            eprintln!("{:#?}", db_error);

            HttpResponse::InternalServerError().json(
                ApiResponse {
                    success: false,
                    message: db_error.to_string(),
                }
            )

        }

        Err(error) => {

            eprintln!("DATABASE ERROR");
            eprintln!("{:#?}", error);

            HttpResponse::InternalServerError().json(
                ApiResponse {
                    success: false,
                    message: error.to_string(),
                }
            )

        }

    }

}