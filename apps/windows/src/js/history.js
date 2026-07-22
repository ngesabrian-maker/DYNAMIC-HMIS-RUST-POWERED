const history = [];

let current = -1;

export function visit(page) {

    // Ignore duplicate consecutive pages
    if (history[current] === page) {
        return;
    }

    // Remove forward history
    history.splice(current + 1);

    history.push(page);

    current++;

    updateButtons();
}

export function back() {

    if (current <= 0) return null;

    current--;

    updateButtons();

    return history[current];

}

export function forward() {

    if (current >= history.length - 1) return null;

    current++;

    updateButtons();

    return history[current];

}

function updateButtons() {

    const backBtn = document.getElementById("back-btn");
    const forwardBtn = document.getElementById("forward-btn");

    if(backBtn)
        backBtn.disabled = current <= 0;

    if(forwardBtn)
        forwardBtn.disabled = current >= history.length - 1;

}