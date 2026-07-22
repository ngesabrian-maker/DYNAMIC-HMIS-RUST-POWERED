const cache = new Map();

export function getConversation(id) {

    return cache.get(id);

}

export function saveConversation(id, messages) {

    cache.set(id, messages);

}

export function clearChatCache() {

    cache.clear();

}