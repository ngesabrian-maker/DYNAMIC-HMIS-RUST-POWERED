const API = "http://127.0.0.1:8000/api/chat";

export async function getRecentChats(staffId) {

    const res = await fetch(`${API}/load/${staffId}`);

    if (!res.ok) {

        throw new Error(`HTTP ${res.status}`);

    }

    return await res.json();

}

export async function searchStaff(query) {

    const res = await fetch(

        `${API}/search?q=${encodeURIComponent(query)}`

    );

    if (!res.ok) {

        throw new Error(`HTTP ${res.status}`);

    }

    return await res.json();

}

export async function loadConversation(

    staffId,

    otherStaffId

) {

    const res = await fetch(

        `${API}/conversation/${staffId}/${otherStaffId}`

    );

    if (!res.ok) {

        throw new Error(`HTTP ${res.status}`);

    }

    return await res.json();

}

export async function sendMessage(receiverId, message) {

    const user = JSON.parse(
        sessionStorage.getItem("user")
    );

    const res = await fetch(`${API}/send`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            sender_id: user.staff_id,

            receiver_id: receiverId,

            message: message

        })

    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();

}
export async function loadContacts(staffId) {

    const res = await fetch(

        `${API}/contacts/${staffId}`

    );

    if (!res.ok) {

        throw new Error(`HTTP ${res.status}`);

    }

    return await res.json();

}
