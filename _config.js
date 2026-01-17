// ============================================================
// 1. CONFIGURAÇÃO (_config.js)
// ============================================================

const CLIENTE = {
    info: {
        nome: "Koda System",
        slogan: "Mobile Innovation",
        versao: "3.0 Mobile",
        logoTexto: "Koda App",
        logoIcone: "fa-cubes"
    },
    theme: {
        primary: "#4f46e5",   // Indigo (Moderno e Vibrante no Mobile)
        secondary: "#06b6d4", // Cyan
        dark: "#111827"       // Gray-900 (Melhor contraste para OLED)
    }
};

const DICT = {
    pt: {
        nav_home: "Início",
        nav_leads: "Leads",
        nav_stock: "Portfólio",
        nav_menu: "Menu",
        btn_new: "Novo",
        welcome: "Olá",
        theme_dark: "Tema Escuro",
        theme_light: "Tema Claro"
    },
    en: {
        nav_home: "Home",
        nav_leads: "Leads",
        nav_stock: "Portfolio",
        nav_menu: "Menu",
        btn_new: "New",
        welcome: "Hello",
        theme_dark: "Dark Mode",
        theme_light: "Light Mode"
    }
};

const DB = {
    usuarioAtual: {
        nome: "Paulo Ricardo",
        avatar: "https://ui-avatars.com/api/?name=Paulo+Ricardo&background=4f46e5&color=fff&size=128", // Size 128 para retina display
        cargo: "Founder"
    },
    // Dados Mockados para teste rápido
    vendedores: [
        { id: 1, nome: "Paulo", vendas: 12, total: 450000.00, isUser: true, foto: "https://ui-avatars.com/api/?name=P&background=4f46e5&color=fff" }
    ],
    estoque: [
        {
            id: 101,
            titulo: "App Delivery SaaS",
            subtitulo: "Flutter • Código Fonte",
            imagem: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600",
            valor: 12500.00,
            status: "ATIVO",
            views: 4200,
            canais: ["App Store"]
        },
        {
            id: 102,
            titulo: "Dashboard Admin",
            subtitulo: "React • Template",
            imagem: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
            valor: 5000.00,
            status: "RASCUNHO",
            views: 120,
            canais: []
        }
    ]
};
