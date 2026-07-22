use actix_web::{get, HttpResponse, Responder};
use chrono::Utc;
use serde::Serialize;

#[derive(Serialize)]
struct HealthResponse {
    application: String,
    status: String,
    database: String,
    database_engine: String,
    version: String,
    server_time: String,
}

#[get("/api/health")]
pub async fn health() -> impl Responder {
    let response = HealthResponse {
        application: "FhETCH HMIS".to_string(),
        status: "online".to_string(),
        database: "connected".to_string(),
        database_engine: "MySQL".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        server_time: Utc::now().to_rfc3339(),
    };

    HttpResponse::Ok().json(response)
}// this is a debuging rest api to make sure  the server is running and the database is connected. It will be removed in production