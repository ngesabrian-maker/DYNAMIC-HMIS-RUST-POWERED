const API_BASE = "http://127.0.0.1:8000";

export async function apiFetch(endpoint, options = {}) {

    const token = sessionStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        logout();
        return;
    }

    return response;
}

