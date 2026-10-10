/*
 * Ready Set New - shared password gate.
 * Load this on the front page and on every project page / subdomain:
 *     <script src="https://readysetnew.github.io/assets/rsn-gate.js"></script>
 *     RSNGate.require(function () { ...show the project... });
 * On readysetnew.com and its subdomains the unlock is remembered across all of them
 * (cookie on .readysetnew.com, 12 hours). Elsewhere it is remembered for the browser session.
 *
 * NOTE: this runs in the visitor's browser, so it only keeps casual visitors out. Anything that
 * must be truly private has to be protected on the server (see the Caddy snippet kept on the server).
 */
(function () {
    var SALT = 'rsn-2026-gate', ITER = 150000, HASH = '15ae04ec33559f5a973466476d79713057207c1806508105698bcb8bac04e5d9';
    var COOKIE = 'rsn_gate', TOKEN = HASH.slice(0, 40);
    var onSite = /(^|\.)readysetnew\.com$/.test(location.hostname);
    function enc(s) { return new TextEncoder().encode(s); }
    function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
    function check(pw) {
        return crypto.subtle.importKey('raw', enc(pw), 'PBKDF2', false, ['deriveBits']).then(function (key) {
            return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc(SALT), iterations: ITER, hash: 'SHA-256' }, key, 256);
        }).then(function (bits) { return hex(bits) === HASH; });
    }
    function isAuthed() {
        try { if (sessionStorage.getItem(COOKIE) === TOKEN) return true; } catch (e) {}
        return document.cookie.split('; ').indexOf(COOKIE + '=' + TOKEN) !== -1;
    }
    function remember() {
        try { sessionStorage.setItem(COOKIE, TOKEN); } catch (e) {}
        if (onSite) document.cookie = COOKIE + '=' + TOKEN + '; domain=.readysetnew.com; path=/; max-age=43200; SameSite=Lax; Secure';
    }
    function logout() {
        try { sessionStorage.removeItem(COOKIE); } catch (e) {}
        document.cookie = COOKIE + '=; path=/; max-age=0';
        if (onSite) document.cookie = COOKIE + '=; domain=.readysetnew.com; path=/; max-age=0';
    }
    function prompt(onOk) {
        var box = document.createElement('div');
        box.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#000;display:grid;place-items:center;font:16px/1.5 monospace;color:#0f0;opacity:0;transition:opacity 1s ease';
        box.innerHTML = '<form style="text-align:center;padding:24px 16px;max-width:360px;width:100%;box-sizing:border-box" autocomplete="off">' +
            '<div style="letter-spacing:.2em;margin-bottom:18px">ACCESS REQUIRED</div>' +
            '<input type="password" aria-label="Password" autocomplete="current-password" style="width:100%;box-sizing:border-box;background:#000;color:#0f0;border:1px solid #0a0;border-radius:4px;padding:10px 12px;font:inherit;text-align:center;outline:none">' +
            '<div role="status" style="min-height:1.5em;margin-top:12px;color:#8a8f98"></div></form>';
        document.body.appendChild(box);
        var form = box.firstChild, input = form.querySelector('input'), msg = form.querySelector('[role=status]');
        requestAnimationFrame(function () { box.style.opacity = '1'; input.focus(); });
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            msg.textContent = '...';
            check(input.value).then(function (ok) {
                if (ok) {
                    remember(); msg.style.color = '#0f0'; msg.textContent = 'access granted';
                    box.style.opacity = '0';
                    setTimeout(function () { box.remove(); onOk(); }, 900);
                } else {
                    msg.style.color = '#f55'; msg.textContent = 'access denied'; input.value = ''; input.focus();
                }
            });
        });
    }
    window.RSNGate = {
        isAuthed: isAuthed, logout: logout, _check: check,
        require: function (onOk) {
            if (isAuthed()) { onOk(); return; }
            if (document.body) prompt(onOk); else document.addEventListener('DOMContentLoaded', function () { prompt(onOk); });
        }
    };
})();
