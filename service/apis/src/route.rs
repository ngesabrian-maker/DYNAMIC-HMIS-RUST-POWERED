use actix_web::web;

use crate::database::health::health;
use crate::auth::auth::login;
use crate::administrator::staff;
use crate::chats;
use crate::receptionist;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(health);
    cfg.service(login);
    cfg.service(
        web::scope("/api/staff")
            .service(staff::add_staff::add_staff)
            .service(staff::load_staff::load_staff)
    );
    cfg.service(chats::load_chat::load_chats);
    cfg.service(chats::load_chat::load_conversation);
    cfg.service(chats::send_chat::send_message);
    cfg.service(chats::contacts::load_contacts);
    cfg.service(receptionist::patients_registration::register_patient);
    cfg.service(receptionist::queue::queue_search::search_patients);
    cfg.service(receptionist::queue::queue_registration::register_visit);
    cfg.service(receptionist::queue::queue_today::today_queue);
    cfg.service(receptionist::queue::queue_status::update_queue_status);
}