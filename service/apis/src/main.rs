use actix_cors::Cors;
use actix_web::{http::header, web, App, HttpServer};
use dotenvy::dotenv;
use env_logger::Env;
use log::info;

mod accountant;
mod administrator;
mod auth;
mod cashier;
mod config;
mod database;
mod doctor;
mod dto;
mod labtech;
mod nurse;
mod pharmtech;
mod radiographer;
mod receptionist;
mod route;
mod services;
mod utils;
mod chats;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load environment variables
    dotenv().ok();

    // Initialize logger
    env_logger::Builder::from_env(
        Env::default().default_filter_or("info"),
    )
    .init();

    // Create MySQL connection pool
    let pool = database::create_pool()
        .await
        .expect("Failed to connect to MySQL");

    info!("✅ Connected to MySQL");

    // Read server configuration
    let host = std::env::var("HOST")
        .unwrap_or_else(|_| "127.0.0.1".to_string());

    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse()
        .expect("Invalid PORT");

    info!("🚀 Server running at http://{}:{}", host, port);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allowed_methods(vec![
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS",
                    ])
                    .allowed_headers(vec![
                        header::AUTHORIZATION,
                        header::CONTENT_TYPE,
                        header::ACCEPT,
                    ])
                    .max_age(3600),
            )
            .configure(route::configure)
    })
    .bind((host.as_str(), port))?
    .run()
    .await
}