// ============================================================
// CONFIGURAÇÃO DO CLIENTE (WHITE-LABEL)
// Edite aqui para personalizar o sistema para um novo cliente
// ============================================================

const CLIENTE = {
    info: {
        nome: "Koda System",        // Nome da Venture Builder
        slogan: "Innovation Hub",   // Slogan Tech
        versao: "v3.0.1",           // Versão
        logoTexto: "Koda ADMIN",    // Texto do Menu
        logoIcone: "fa-cubes"       // Ícone Tech (Cubos/Estrutura)
    },
    
    // Paleta de Cores (Tema Tech/SaaS Moderno)
    theme: {
        primary: "#4f46e5",   // Indigo-600 (Cor moderna de startup)
        secondary: "#06b6d4", // Cyan-500 (Acentos futuristas)
        dark: "#1e1b4b"       // Indigo-950 (Fundo muito escuro e azulado)
    }
};

// ============================================================
// DICIONÁRIO DE TRADUÇÃO (I18N)
// Usado pelo functions.js para trocar idioma
// ============================================================

const DICT = {
    pt: {
        nav_home: "Dashboard",
        nav_leads: "Oportunidades", // Mudei de Leads para Oportunidades
        nav_stock: "Portfólio",     // Mudei de Estoque para Portfólio
        nav_menu: "Menu",
        btn_new: "Novo Projeto",
        welcome: "Bem-vindo",
        loading: "Carregando Koda...",
        theme_dark: "Modo Escuro",
        theme_light: "Modo Claro"
    },
    en: {
        nav_home: "Dashboard",
        nav_leads: "Pipeline",
        nav_stock: "Portfolio",
        nav_menu: "Menu",
        btn_new: "New Project",
        welcome: "Welcome",
        loading: "Loading Koda...",
        theme_dark: "Dark Mode",
        theme_light: "Light Mode"
    }
};

// ============================================================
// BANCO DE DADOS MOCK (SIMULADO)
// Dados iniciais para preencher a tela
// ============================================================

const DB = {
    usuarioAtual: {
        nome: "Paulo Ricardo",
        avatar: "https://ui-avatars.com/api/?name=Paulo+Ricardo&background=4f46e5&color=fff",
        cargo: "CEO / Founder"
    },
    
    vendedores: [
        { id: 1, nome: "Paulo (CEO)", vendas: 12, total: 450000.00, isUser: true, foto: "https://ui-avatars.com/api/?name=Paulo&background=4f46e5&color=fff" },
        { id: 2, nome: "Dev Team A", vendas: 5, total: 125000.00, isUser: false, foto: "https://ui-avatars.com/api/?name=Dev+Team&background=random" },
        { id: 3, nome: "Comercial", vendas: 8, total: 82000.00, isUser: false, foto: "https://ui-avatars.com/api/?name=Sales&background=random" }
    ],

    // Note que mudei os produtos para SOFTWARE em vez de Tratores
    estoque: [
        {
            id: 101,
            titulo: "SaaS Delivery App",
            subtitulo: "Ref: #KODA-01 • Código Fonte • React Native",
            imagem: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400",
            valor: 35000.00,
            status: "ATIVO",
            views: 4200,
            canais: ["Direct", "LinkedIn"]
        },
        {
            id: 102,
            titulo: "CRM Imobiliário White-label",
            subtitulo: "Ref: #KODA-02 • Sistema Web • Python/Django",
            imagem: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400",
            valor: 150000.00,
            status: "RASCUNHO",
            views: 120,
            canais: []
        },
        {
            id: 103,
            titulo: "Landing Page High-Convert",
            subtitulo: "Ref: #KODA-03 • Template • HTML5",
            imagem: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400",
            valor: 2500.00,
            status: "VENDIDO",
            views: 850,
            canais: ["Hotmart"]
        }
    ]
};
