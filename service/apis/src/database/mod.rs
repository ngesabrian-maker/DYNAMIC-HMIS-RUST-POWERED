use sqlx::{Pool, Postgres, postgres::PgPoolOptions};
use actix_web::web;
use std::env;

pub type DbPool = web::Data<Pool<Postgres>>;

pub async fn connect() -> Result<DbPool, sqlx::Error> {
    let url = env::var("DATABASE_URL")
        .expect("DATABASE_URL not found");

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&url)
        .await?;

    Ok(web::Data::new(pool))
}