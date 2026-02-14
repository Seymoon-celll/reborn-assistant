async function setLanguage(lang) {
    try {
        const res = await fetch(`lang/${lang}.json`);
        const trans = await res.json();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (trans[key]) {
                el.innerHTML = trans[key];
            }
        });
        
        localStorage.setItem('lang', lang);
        const selector = document.getElementById('langSelector');
        if (selector) selector.value = lang;
    } catch(e) {
        console.error('Lang error:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('lang') || 'fr';
    const selector = document.getElementById('langSelector');
    if (selector) {
        selector.value = saved;
        setLanguage(saved);
    }
});
