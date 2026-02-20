(function () {
    var style = document.createElement('style');
    style.textContent = [
        '.lang-dropdown{position:relative;display:inline-flex;align-items:center;}',
        '.lang-dropdown select{appearance:none;-webkit-appearance:none;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.25);border-radius:20px;padding:5px 28px 5px 12px;font-family:\'Inter\',sans-serif;font-size:11px;font-weight:600;color:#d4af37;cursor:pointer;outline:none;transition:all 0.2s ease;letter-spacing:0.5px;}',
        '.lang-dropdown select:hover{border-color:rgba(212,175,55,0.5);background:rgba(212,175,55,0.1);}',
        '.lang-dropdown select option{background:#141410;color:#f0ead6;}',
        '.lang-dropdown::after{content:"▾";position:absolute;right:10px;pointer-events:none;font-size:10px;color:#d4af37;}'
    ].join('');
    document.head.appendChild(style);

    function setLang(lang) {
        localStorage.setItem('site-lang', lang);
        var sel = document.getElementById('lang-select');
        if (sel) sel.value = lang;
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
