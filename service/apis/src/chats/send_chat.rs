use actix_web::{post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use sqlx::MySqlPool;

#[derive(Deserialize)]
pub struct SendMessageRequest {
    pub sender_id: u32,
    pub receiver_id: u32,
    pub message: String,
}

#[derive(Serialize)]
pub struct SendMessageResponse {
    pub success: bool,
    pub message: String,
}

#[post("/api/chat/send")]
pub async fn send_message(
    pool: web::Data<MySqlPool>,
    data: web::Json<SendMessageRequest>,
) -> impl Responder {

    let result = sqlx::query(
        r#"
        INSERT INTO staff_messages
        (
            sender_id,
            receiver_id,
            message_text
        )
        VALUES (?, ?, ?)
        "#
    )
    .bind(data.sender_id)
    .bind(data.receiver_id)
    .bind(&data.message)
    .execute(pool.get_ref())
    .await;

    match result {

        Ok(result) => {

            HttpResponse::Ok().json(
                SendMessageResponse {
                    success: true,
                    message: format!(
                        "Message sent successfully. ID={}",
                        result.last_insert_id()
                    ),
                }
            )

        }

        Err(err) => {

            eprintln!("Database error: {}", err);

            HttpResponse::InternalServerError().json(
                SendMessageResponse {
                    success: false,
                    message: "Failed to send message".to_string(),
                }
            )

        }

    }

}