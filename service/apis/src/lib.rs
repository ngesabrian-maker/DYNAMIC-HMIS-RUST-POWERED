pub mod auth;
pub mod config;
pub mod database;
pub mod dto;
pub mod errors;
pub mod handlers;
pub mod middleware;
pub mod models;
pub mod repositories;
pub mod routes;
pub mod services;
pub mod utils;

use actix_web::{App, HttpServer};
use dotenvy::dotenv;

pub async fn startup() -> std::io::Result<()> {


println!("Current dir = {:?}", std::env::current_dir().unwrap());

dotenv().expect("Failed to load .env");

    println!("DATABASE_URL = {:?}", std::env::var("DATABASE_URL"));
    env_logger::init();

    let database = database::connect()
        .await
        .expect("Database connection failed");

    println!("Connected to PostgreSQL.");

    HttpServer::new(move || {
        App::new()
            .app_data(database.clone())
            .configure(routes::register_routes)
    })
    .bind(config::server_address())?
    .run()
    .await
}