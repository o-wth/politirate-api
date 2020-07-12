#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Politirate Root Index"
}

#[get("/politicians")]
fn politicians() -> &'static str {
    "Politician API Endpint"
}

#[get("/posts/<politician>")]
fn posts(politician: String) -> String {
    format!("A list of all {}'s posts", politician)
}

#[get("/score/<politician>")]
fn score(politician: String) -> String {
    format!("The score of the politician {}", politician)
}

#[get("/history/<politician>")]
fn history(politician: String) -> String {
    format!("History of the politician {}", politician)
}

fn main() {
    let rocket = rocket::ignite()
        .mount("/", routes![index])
        .mount("/", routes![politicians, posts, score, history]);

    rocket.launch();
}