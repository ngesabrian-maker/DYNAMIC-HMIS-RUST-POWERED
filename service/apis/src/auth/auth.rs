use actix_web::{post, web, HttpResponse, Responder};
use sqlx::MySqlPool;
use bcrypt::verify;

use crate::auth::dto::{LoginRequest, LoginResponse, LoginUser};

#[post("/api/auth/login")]
pub async fn login(
    pool: web::Data<MySqlPool>,
    request: web::Json<LoginRequest>,
) -> impl Responder {

    let result = sqlx::query!(
        r#"
        SELECT
            staff_id,
            first_name,
            last_name,
            role,
            password_hash
        FROM staff
        WHERE email = ?
        "#,
        request.email
    )
    .fetch_optional(pool.get_ref())
    .await;

    match result {

        Err(e) => {

            eprintln!("Database Error: {:?}", e);

            HttpResponse::InternalServerError().json(
                serde_json::json!({
                    "success": false,
                    "message": "Database error",
                    "error": format!("{:?}", e)
                })
            )

        }

        Ok(None) => {

            println!("No user found with email: {}", request.email);

            HttpResponse::Unauthorized().json(
                serde_json::json!({
                    "success": false,
                    "message": "Invalid email or password"
                })
            )

        }

        Ok(Some(user)) => {

            // TEMPORARY
            // Replace this with Argon2 password verification later
        if !verify(&request.password, &user.password_hash).unwrap_or(false) {

            return HttpResponse::Unauthorized().json(
                serde_json::json!({
                    "success": false,
                    "message": "Invalid email or password"
                })
            );

        }
            println!("==============================");
println!("User Found");
println!("Staff ID      : {}", user.staff_id);
println!("First Name    : {}", user.first_name);
println!("Last Name     : {}", user.last_name);
println!("Password Hash : {}", user.password_hash);
println!("Entered Pass  : {}", request.password);
println!("==============================");

            // TEMPORARY
            // Replace with JWT generation later
            let token = format!("TOKEN-{}", user.staff_id);

            let response = LoginResponse {

                success: true,

                message: String::from("Login successful"),

                token,

                user: LoginUser {

                    staff_id: user.staff_id,

                    first_name: user.first_name,

                    last_name: user.last_name,

                    role: user.role,

                },

            };

            HttpResponse::Ok().json(response)

        }
        

    }

}