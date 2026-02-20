(function () {
    var style = document.createElement('style');
    style.textContent = [
        '.lang-toggle{display:inline-flex;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.22);border-radius:22px;padding:3px;gap:2px;backdrop-filter:blur(8px);}',
        '.lang-btn{background:transparent;border:none;border-radius:18px;padding:5px 13px;font-family:\'Inter\',sans-serif;font-size:11px;font-weight:600;color:#d4af37;cursor:pointer;transition:all 0.22s ease;letter-spacing:0.8px;opacity:0.45;line-height:1;}',
        '.lang-btn.active{background:linear-gradient(135deg,rgba(212,175,55,0.22),rgba(212,175,55,0.12));opacity:1;box-shadow:0 0 12px rgba(212,175,55,0.25),inset 0 1px 0 rgba(212,175,55,0.3);}',
        '.lang-btn:hover:not(.active){opacity:0.75;background:rgba(212,175,55,0.07);}'
    ].join('');
    document.head.appendChild(style);

    function setLang(lang) {
        localStorage.setItem('site-lang', lang);
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        document.querySelectorAll('[data-fr][data-en]').forEach(function (el) {
            var val = el.getAttribute('data-' + lang);
            if (val !== null) {
                if (val.indexOf('<') !== -1) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            }
        });
        document.documentElement.lang = lang;
    }

    window.setLang = setLang;

    document.addEventListener('DOMContentLoaded', function () {
        setLang(localStorage.getItem('site-lang') || 'fr');
    });
})();
