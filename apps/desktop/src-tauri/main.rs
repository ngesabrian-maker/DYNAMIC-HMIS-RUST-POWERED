#[tauri::command]
async fn get_health() -> Result<String, String> {
    let response = reqwest::get("http://127.0.0.1:8080/api/health")
        .await
        .map_err(|err| err.to_string())?;

    let body = response
        .text()
        .await
        .map_err(|err| err.to_string())?;

    Ok(body)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_health])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
