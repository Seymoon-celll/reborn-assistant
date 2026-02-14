// Reborn Assistant - Language Switcher
async function setLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        const translations = await response.json();
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
        
        localStorage.setItem('lang', lang);
        
        document.querySelectorAll('.lang-selector button').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.style.background = 'rgba(212,175,55,0.3)';
                btn.style.borderColor = 'var(--gold)';
            } else {
                btn.style.background = 'rgba(212,175,55,0.1)';
                btn.style.borderColor = 'rgba(212,175,55,0.3)';
            }
        });
    } catch (error) {
        console.error('Error loading language:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'fr';
    setLanguage(savedLang);
});
