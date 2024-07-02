use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use reqwest::Client;

#[get("/validatetxn/{txhash}")]
async fn validate_txn(txhash: web::Path<String>) -> impl Responder {
    let api_key = "update"; // Replace with your Taikoscan API key
    let url = format!(
        "https://api.taikoscan.io/api?module=transaction&action=gettxreceiptstatus&txhash={}&apikey={}",
        txhash,
        api_key
    );

    match Client::new().get(&url).send().await {
        Ok(response) => {
            if response.status().is_success() {
                let text = response.text().await.unwrap_or_else(|_| "Failed to fetch data".to_string());
                HttpResponse::Ok().body(text)
            } else {
                HttpResponse::InternalServerError().finish()
            }
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(validate_txn)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
