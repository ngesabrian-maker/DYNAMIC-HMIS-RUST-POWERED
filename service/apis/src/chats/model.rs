use serde::Serialize;
use sqlx::FromRow;

#[derive(Debug, Serialize, FromRow)]
pub struct RecentChat {

    pub staff_id: u32,

    pub first_name: String,

    pub last_name: String,

    pub role: String,

    pub last_message: String,

    pub unread: i32,

    pub created_at: String,

}

#[derive(Debug, Serialize, FromRow)]
pub struct ChatMessage {

    pub message_id: i32,

    pub sender_id: u32,

    pub receiver_id: u32,

    pub message_text: String,

    pub is_read: i32,

    pub created_at: String,

}