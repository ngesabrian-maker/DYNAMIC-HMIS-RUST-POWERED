js/
│
├── chat/
│   ├── chat.js                 // main controller
│   ├── chat_api.js             // fetch() calls
│   ├── chat_loader.js          // load recent chats
│   ├── chat_sender.js          // send message
│   ├── chat_search.js          // search staff
│   ├── chat_window.js          // open conversation
│   ├── chat_renderer.js        // render HTML
│   ├── chat_polling.js         // auto refresh
│   └── chat_cache.js           // cache conversations


| Method | Endpoint                              | Purpose                                 |
| ------ | ------------------------------------- | --------------------------------------- |
| GET    | `/api/chat/load`                    | Recent conversations with unread counts |
| GET    | `/api/chat/search?q=`                 | Search staff by ID or name              |
| GET    | `/api/chat/{staff_id}`                | Load conversation with a staff member   |
| POST   | `/api/chat/send`                      | Send a message                          |
| PUT    | `/api/chat/read/{staff_id}`           | Mark conversation as read               |
| DELETE | `/api/chat/{message_id}` *(optional)* | Delete a message                        |



chat.js
    │
    ▼
chat_loader.js
    │
    ▼
chat_renderer.js
    │
(click)
    ▼
chat_window.js
    │
    ▼
chat_api.js
    │
    ▼
Rust API


how to initialize conversation

Click Contacts
        │
        ▼
GET /api/chat/contacts/{staff_id}
        │
        ▼
renderContacts()
        │
        ▼
Click a staff member
        │
        ▼
openConversation(contact)
        │
        ▼
loadConversation(my_id, contact.staff_id)
        │
        ▼
If messages exist → show them
If none exist → empty conversation ready to send