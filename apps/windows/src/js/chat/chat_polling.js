let timer = null;

export function startPolling(callback) {

    timer = setInterval(callback, 3000);

}

export function stopPolling() {

    clearInterval(timer);

}