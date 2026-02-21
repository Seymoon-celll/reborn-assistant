/* ── Reborn Assistant — i18n loader ── */

const LANGS = {
  fr: { flag: '🇫🇷', label: 'Français' },
  en: { flag: '🇬🇧', label: 'English'  },
  es: { flag: '🇪🇸', label: 'Español'  },
};

const SUPPORTED = Object.keys(LANGS);

/* Resolve dot-path in an object: "pricing.voyageur.rank" → value */
function resolve(obj, path) {
  return path.split('.').reduce((acc, k) => acc?.[k], obj);
}

/* Apply loaded translations to every [data-i18n] element */
function applyTranslations(strings) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = resolve(strings, el.dataset.i18n);
    if (val !== undefined) {
      if (val.includes('<')) el.innerHTML = val;
      else el.textContent = val;
    }
  });
  document.documentElement.lang = currentLang;
}

/* Detect browser language, fallback to 'fr' */
function detectBrowserLang() {
  const code = (navigator.language || '').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(code) ? code : 'fr';
}

let currentLang = localStorage.getItem('site-lang') || detectBrowserLang();
let cachedStrings = {};

/* Load a lang file dynamically and apply translations */
async function setLang(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'fr';
  currentLang = lang;
  localStorage.setItem('site-lang', lang);

  /* Close dropdown */
  const menu = document.querySelector('.lang-select');
  if (menu) menu.classList.remove('open');

  /* Update button display */
  const flagEl = document.querySelector('.lang-flag');
  const codeEl = document.querySelector('.lang-code');
  if (flagEl) flagEl.textContent = LANGS[lang]?.flag ?? '';
  if (codeEl) codeEl.textContent = lang.toUpperCase();

  /* Mark active option */
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  /* Load & cache strings */
  if (!cachedStrings[lang]) {
    const mod = await import(`./${lang}.js`);
    cachedStrings[lang] = mod.default;
  }
  applyTranslations(cachedStrings[lang]);
}

function toggleLangMenu() {
  const el = document.querySelector('.lang-select');
  if (el) el.classList.toggle('open');
}

/* Close on outside click */
document.addEventListener('click', e => {
  const el = document.querySelector('.lang-select');
  if (el && !el.contains(e.target)) el.classList.remove('open');
});

/* Init */
document.addEventListener('DOMContentLoaded', () => setLang(currentLang));

/* Expose globals for inline onclick handlers */
window.setLang = setLang;
window.toggleLangMenu = toggleLangMenu;
