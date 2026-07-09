// une autre commit ya habibi iazeaizeaiueaiuzheakjdkjsjgbzeiuybvertbdehfkzbfdiubdoiazbrti




//j'essaye de faire un changement et ne pas le commit et voir ce que sa fait 

// Netflix Cleaner - Version 2.0 (Polished Controls Edition)
console.log('Netflix Cleaner: Chargement...');

var customBarInjected = false;

function cleanNetflix() {
    var selectors = [
        '.nf-modal', '.nf-modal-background', '.nf-modal-backdrop',
        '.interstitial-full-screen', '[data-uia="clcs-modal"]',
        '[data-uia="foyer-modal"]', '.foyer-modal', '.clcs-modal'
    ];

    for (var i = 0; i < selectors.length; i++) {
        var items = document.querySelectorAll(selectors[i]);
        for (var j = 0; j < items.length; j++) {
            var el = items[j];
            if (!el.querySelector('video') && !el.classList.contains('watch-video')) {
                el.remove();
            }
        }
    }

    if (document.body) {
        document.body.classList.remove('nf-modal-open', 'is-modal-open', 'has-modal');
    }
}

function injectCustomControls() {
    if (customBarInjected) return;
    if (window.location.pathname.indexOf('/watch') === -1) return;

    var container = document.createElement('div');
    container.id = 'netflix-cleaner-custom-bar';
    // Style du conteneur : Minimaliste, sombre, au centre
    container.style.cssText = 'position:fixed; bottom:50px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.5); padding:10px 30px; border-radius:8px; z-index:2147483647; display:flex; gap:30px; align-items:center; backdrop-filter:blur(5px); transition: opacity 0.3s;';

    function createBtn(html, onClick) {
        var btn = document.createElement('button');
        btn.innerHTML = html;
        btn.style.cssText = 'background:none; color:white; border:none; cursor:pointer; font-size:24px; display:flex; align-items:center; justify-content:center; padding:5px; transition: transform 0.1s;';
        btn.onclick = onClick;
        btn.onmouseover = function() { btn.style.transform = 'scale(1.2)'; };
        btn.onmouseout = function() { btn.style.transform = 'scale(1)'; };
        return btn;
    }

    // Icônes simples (Unicode pour éviter les dépendances externes)
    var iconBack = '&#8634;'; // Rebours
    var iconForward = '&#8635;'; // Avance
    var iconPlay = '&#9654;'; // Play
    var iconPause = '&#10073;&#10073;'; // Pause

    var playBtn = createBtn(iconPause, function() {
        var video = document.querySelector('video');
        if (video) {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = iconPause;
            } else {
                video.pause();
                playBtn.innerHTML = iconPlay;
            }
        }
    });

    // Bouton -10s
    container.appendChild(createBtn(iconBack, function() {
        var video = document.querySelector('video');
        if (video) video.currentTime -= 10;
    }));

    // Bouton Play/Pause
    container.appendChild(playBtn);

    // Bouton +10s
    container.appendChild(createBtn(iconForward, function() {
        var video = document.querySelector('video');
        if (video) video.currentTime += 10;
    }));

    document.body.appendChild(container);
    customBarInjected = true;

    // Masquer la barre si la souris ne bouge pas (comme Netflix)
    var timeout;
    document.addEventListener('mousemove', function() {
        container.style.opacity = '1';
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            container.style.opacity = '0';
        }, 3000);
    });
}

function injectGlobalStyles() {
    if (document.getElementById('netflix-clean-global-css')) return;
    var s = document.createElement('style');
    s.id = 'netflix-clean-global-css';
    s.textContent = '#appMountPoint { filter: none !important; } ' +
                    'body { overflow: auto !important; } ' +
                    'body.watch-video { overflow: hidden !important; } ' +
                    '.watch-video { filter: none !important; opacity: 1 !important; visibility: visible !important; }';
    document.head.appendChild(s);
}

setInterval(function() {
    cleanNetflix();
    injectGlobalStyles();
    if (window.location.pathname.indexOf('/watch') !== -1) {
        injectCustomControls();
    } else {
        var bar = document.getElementById('netflix-cleaner-custom-bar');
        if (bar) {
            bar.remove();
            customBarInjected = false;
        }
    }
}, 1000);

cleanNetflix();
