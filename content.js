// Content script: react to the stored `enabled` flag and run/stop page cleaning.
// Do NOT access popup DOM elements from content scripts.

function applyEnabled(enabled) {
    if (enabled) {
        // TODO: add DOM cleaning logic here (e.g., remove overlays)
        console.log('Netflix Cleaner: enabled');
    } else {
        // TODO: stop cleaning or restore state if necessary
        console.log('Netflix Cleaner: disabled');
    }
}

chrome.storage.local.get(["enabled"], (result) => {
    const enabled = result.enabled ?? true;
    applyEnabled(enabled);
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.enabled) {
        applyEnabled(changes.enabled.newValue);
    }
});