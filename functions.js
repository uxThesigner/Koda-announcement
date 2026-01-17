// ============================================================
// 2. LÓGICA & UTILITÁRIOS (functions.js)
// ============================================================

const Core = {
    formatMoney: (val) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

    getCurrentPage: () => {
        const path = window.location.pathname;
        // Pega o nome do arquivo, ignorando query strings (?id=1)
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    },

    getFirstName: (fullName) => {
        if (!fullName) return 'Visitante';
        return fullName.split(' ')[0];
    }
};

const System = {
    currentLang: localStorage.getItem('app_lang') || 'pt',

    t: (key) => {
        if (typeof DICT === 'undefined') return key;
        return DICT[System.currentLang][key] || key;
    },

    toggleLang: () => {
        const novo = System.currentLang === 'pt' ? 'en' : 'pt';
        localStorage.setItem('app_lang', novo);
        System.currentLang = novo;
        if (typeof UI !== 'undefined') UI.atualizarTextos();
    },

    initTheme: () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    toggleTheme: () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
};
