(function () {
    var style = document.createElement('style');
    style.textContent = [
        '.lang-toggle{display:inline-flex;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.25);border-radius:20px;overflow:hidden;}',
        '.lang-btn{padding:5px 14px;font-family:\'Inter\',sans-serif;font-size:11px;font-weight:600;color:#9a9278;cursor:pointer;border:none;background:transparent;transition:all 0.2s ease;}',
        '.lang-btn.active{background:rgba(212,175,55,0.18);color:#d4af37;}'
    ].join('');
    document.head.appendChild(style);

    function setLang(lang) {
        localStorage.setItem('site-lang', lang);
        var btnFr = document.getElementById('btn-fr');
        var btnEn = document.getElementById('btn-en');
        if (btnFr) btnFr.classList.toggle('active', lang === 'fr');
        if (btnEn) btnEn.classList.toggle('active', lang === 'en');
        document.querySelectorAll('[data-fr][data-en]').forEach(function (el) {
            el.innerHTML = el.getAttribute('data-' + lang);
        });
        document.documentElement.lang = lang;
    }

    window.setLang = setLang;

    document.addEventListener('DOMContentLoaded', function () {
        setLang(localStorage.getItem('site-lang') || 'fr');
    });
})();
