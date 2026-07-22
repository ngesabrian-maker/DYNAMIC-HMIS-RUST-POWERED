use actix_web::{
    get,
    web,
    HttpResponse,
    Responder,
};

use sqlx::MySqlPool;

use crate::chats::model::RecentChat;
use crate::chats::model::ChatMessage;

#[get("/api/chat/load/{staff_id}")]
pub async fn load_chats(

    pool: web::Data<MySqlPool>,

    staff_id: web::Path<u32>,

) -> impl Responder {

    let staff_id = staff_id.into_inner();

let sql = r#"

SELECT
    s.staff_id,
    s.first_name,
    s.last_name,
    s.role,
    m.message_text AS last_message,
    DATE_FORMAT(
    m.created_at,
    '%Y-%m-%d %H:%i:%s'
) AS created_at,
    (
        SELECT COUNT(*)
        FROM staff_messages sm
        WHERE sm.sender_id = s.staff_id
          AND sm.receiver_id = ?
          AND sm.is_read = 0
    ) AS unread
FROM staff_messages m
JOIN staff s
ON s.staff_id = CASE
    WHEN m.sender_id = ?
    THEN m.receiver_id
    ELSE m.sender_id
END
WHERE m.message_id = (
    SELECT MAX(sm2.message_id)
    FROM staff_messages sm2
    WHERE
        (
            sm2.sender_id = ?
            AND sm2.receiver_id = s.staff_id
        )
        OR
        (
            sm2.sender_id = s.staff_id
            AND sm2.receiver_id = ?
        )
)
ORDER BY m.created_at DESC;

"#;

    match sqlx::query_as::<_, RecentChat>(sql)

        .bind(staff_id) // unread count

        .bind(staff_id) // CASE

        .bind(staff_id) // sender_id

        .bind(staff_id) // receiver_id

        .fetch_all(pool.get_ref())

        .await

    {

        Ok(chats) => {

            HttpResponse::Ok().json(chats)

        }

        Err(err) => {

            eprintln!("Load chats error: {}", err);

            HttpResponse::InternalServerError().body("Failed to load chats")

        }

    }

}
#[get("/api/chat/conversation/{staff_id}/{other_staff_id}")]
pub async fn load_conversation(

    pool: web::Data<MySqlPool>,

    path: web::Path<(u32, u32)>,

) -> impl Responder {

    let (staff_id, other_staff_id) = path.into_inner();

    let sql = r#"

SELECT

    message_id,

    sender_id,

    receiver_id,

    message_text,

    is_read,

    DATE_FORMAT(
        created_at,
        '%Y-%m-%d %H:%i:%s'
    ) AS created_at

FROM staff_messages

WHERE

    (
        sender_id = ?
        AND receiver_id = ?
    )

OR

    (
        sender_id = ?
        AND receiver_id = ?
    )

ORDER BY created_at ASC;

"#;

    match sqlx::query_as::<_, ChatMessage>(sql)

        .bind(staff_id)

        .bind(other_staff_id)

        .bind(other_staff_id)

        .bind(staff_id)

        .fetch_all(pool.get_ref())

        .await

    {

        Ok(messages) => {

            HttpResponse::Ok().json(messages)

        }

        Err(err) => {

            eprintln!("Load conversation error: {}", err);

            HttpResponse::InternalServerError()
                .body("Failed to load conversation")

        }

    }

}