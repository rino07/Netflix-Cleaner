const toggle = document.getElementById('toggle');
const statusText = document.getElementById('statusText');
const dot = document.querySelector('.dot');

function updateButton(enabled) {
    if (!toggle || !statusText) return;

    if (enabled) {
        toggle.classList.add('enabled');
        statusText.textContent = 'Active';
        if (dot) {
            dot.classList.remove('disabled');
        }
    } else {
        toggle.classList.remove('enabled');
        statusText.textContent = 'Disabled';
        if (dot) {
            dot.classList.add('disabled');
        }
    }
}

chrome.storage.local.get(['enabled'], (result) => {
    const enabled = result.enabled ?? true;
    updateButton(enabled);
});

if (toggle) {
    toggle.addEventListener('click', () => {
        chrome.storage.local.get(['enabled'], (result) => {
            const newState = !(result.enabled ?? true);

            chrome.storage.local.set({ enabled: newState }, () => {
                updateButton(newState);
            });
        });
    });
}