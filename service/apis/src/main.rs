use hmis_server::startup;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    startup().await
}
