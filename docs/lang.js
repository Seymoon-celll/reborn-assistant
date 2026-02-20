(function () {
    /* ── CSS ── */
    var style = document.createElement('style');
    style.textContent = [
        '.lang-select{position:relative;display:inline-block;user-select:none;}',
        '.lang-select-btn{display:flex;align-items:center;gap:7px;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.25);border-radius:8px;padding:7px 13px;font-family:\'Inter\',sans-serif;font-size:12px;font-weight:600;color:#d4af37;cursor:pointer;transition:all 0.2s ease;letter-spacing:0.5px;white-space:nowrap;}',
        '.lang-select-btn:hover{background:rgba(212,175,55,0.12);border-color:rgba(212,175,55,0.45);}',
        '.lang-chevron{font-size:9px;transition:transform 0.2s ease;opacity:0.6;margin-left:2px;}',
        '.lang-select.open .lang-chevron{transform:rotate(180deg);}',
        '.lang-select-menu{position:absolute;top:calc(100% + 6px);right:0;min-width:130px;background:rgba(10,10,8,0.97);border:1px solid rgba(212,175,55,0.25);border-radius:8px;overflow:hidden;display:none;flex-direction:column;backdrop-filter:blur(16px);box-shadow:0 12px 40px rgba(0,0,0,0.6),0 0 0 1px rgba(212,175,55,0.08);z-index:999;}',
        '.lang-select.open .lang-select-menu{display:flex;}',
        '.lang-option{display:flex;align-items:center;gap:9px;width:100%;background:transparent;border:none;border-bottom:1px solid rgba(212,175,55,0.08);padding:10px 14px;font-family:\'Inter\',sans-serif;font-size:12px;font-weight:500;color:#9a9278;cursor:pointer;transition:all 0.15s ease;text-align:left;}',
        '.lang-option:last-child{border-bottom:none;}',
        '.lang-option:hover{background:rgba(212,175,55,0.09);color:#d4af37;}',
        '.lang-option.active{color:#d4af37;background:rgba(212,175,55,0.05);font-weight:600;}'
    ].join('');
    document.head.appendChild(style);

    var FLAGS = { fr: '🇫🇷', en: '🇬🇧' };
    var LABELS = { fr: 'Français', en: 'English' };

    function toggleLangMenu() {
        var el = document.querySelector('.lang-select');
        if (el) el.classList.toggle('open');
    }

    function setLang(lang) {
        localStorage.setItem('site-lang', lang);

        /* close menu */
        var el = document.querySelector('.lang-select');
        if (el) el.classList.remove('open');

        /* update button display */
        var flagEl = document.querySelector('.lang-flag');
        var codeEl = document.querySelector('.lang-code');
        if (flagEl) flagEl.textContent = FLAGS[lang] || '';
        if (codeEl) codeEl.textContent = lang.toUpperCase();

        /* update active option */
        document.querySelectorAll('.lang-option').forEach(function (opt) {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        /* translate */
        document.querySelectorAll('[data-fr][data-en]').forEach(function (el) {
            var val = el.getAttribute('data-' + lang);
            if (val !== null) {
                if (val.indexOf('<') !== -1) { el.innerHTML = val; } else { el.textContent = val; }
            }
        });

        document.documentElement.lang = lang;
    }

    window.setLang = setLang;
    window.toggleLangMenu = toggleLangMenu;

    /* close on outside click */
    document.addEventListener('click', function (e) {
        var el = document.querySelector('.lang-select');
        if (el && !el.contains(e.target)) el.classList.remove('open');
    });

    document.addEventListener('DOMContentLoaded', function () {
        setLang(localStorage.getItem('site-lang') || 'fr');
    });
})();
