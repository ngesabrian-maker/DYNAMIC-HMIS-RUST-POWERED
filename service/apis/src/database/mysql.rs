use sqlx::{MySqlPool, mysql::MySqlPoolOptions};

pub async fn create_pool() -> Result<MySqlPool, sqlx::Error> {
    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not set");

    MySqlPoolOptions::new()
        .max_connections(30)
        .connect(&database_url)
        .await
}