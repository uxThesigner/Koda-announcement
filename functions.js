// ============================================================
// FUNCTIONS.JS - A INTELIGÊNCIA (Lógica Pura & Estado)
// ============================================================

const Core = {
    // 1. Utilitário: Formatar Dinheiro (R$ 1.000,00)
    formatMoney: (val) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

    // 2. Utilitário: Detectar Página Atual (Para pintar o menu corretamente)
    getCurrentPage: () => {
        const path = window.location.pathname;
        // Pega o que vem depois da última barra "/" ou assume 'index.html' se vazio
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    },

    // 3. Lógica: Filtrar Dados (Não desenha, só devolve a lista filtrada)
    filtrarDados: (dados, status) => {
        if (status === 'todos') return dados;
        return dados.filter(item => item.status === status);
    },

    // 4. Lógica: Obter Primeiro Nome (Ex: "Paulo Ricardo" -> "Paulo")
    getFirstName: (fullName) => {
        if (!fullName) return 'Visitante';
        return fullName.split(' ')[0];
    },

    // 5. Lógica: Simulação Financeira (Cálculo de parcelas)
    calcularParcela: (valorTotal, meses = 60, taxa = 1.15) => {
        const entrada = valorTotal * 0.20; // 20% de entrada
        const financiado = valorTotal - entrada;
        const parcela = (financiado / meses) * taxa; // Juros simples fictícios
        return { 
            entrada: entrada, 
            parcela: parcela,
            total: entrada + (parcela * meses)
        };
    }
};

const System = {
    // --- GERENCIAMENTO DE IDIOMA (I18N) ---
    
    // Pega da memória do navegador ou usa 'pt' como padrão
    currentLang: localStorage.getItem('app_lang') || 'pt', 

    // Muda o idioma e salva
    setLang: (lang) => {
        System.currentLang = lang;
        localStorage.setItem('app_lang', lang); // Persistência
        
        // Se a interface (UI) já estiver carregada, manda atualizar
        if (typeof UI !== 'undefined' && UI.atualizarTextos) {
            UI.atualizarTextos();
        }
    },

    // Alterna entre PT e EN (Botão rápido)
    toggleLang: () => {
        const novo = System.currentLang === 'pt' ? 'en' : 'pt';
        System.setLang(novo);
    },

    // Função Tradutora: Recebe a chave (ex: 'welcome') e devolve o texto
    t: (key) => {
        // Verifica se o dicionário existe
        if (typeof DICT === 'undefined') return key;
        
        // Tenta achar a tradução, se não achar, devolve a própria chave
        return DICT[System.currentLang][key] || key;
    },

    // --- GERENCIAMENTO DE TEMA (DARK MODE) ---

    // Inicia o tema ao carregar a página
    initTheme: () => {
        // Verifica se tem salvo OU se o sistema operacional do usuário é escuro
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    // Botão de alternar Claro/Escuro
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
