// ============================================================
// CONFIGURAÇÃO DO CLIENTE (WHITE-LABEL)
// Edite aqui para personalizar o sistema para um novo cliente
// ============================================================

const CLIENTE = {
    info: {
        nome: "DoTerra",            // Nome no Título/Header
        slogan: "Marketplace Agro", // Slogan
        versao: "v2.4",             // Versão do sistema
        logoTexto: "DoTerra SYS",   // Texto da logo no menu
        logoIcone: "fa-leaf"        // Ícone da FontAwesome (ex: fa-tractor, fa-building)
    },
    
    // Paleta de Cores (O sistema vai gerar as variações automaticamente no Tailwind)
    theme: {
        primary: "#16a34a",   // Cor Principal (Botões, Destaques) - Ex: Verde (#16a34a) ou Azul (#2563eb)
        secondary: "#D69E2E", // Cor Secundária (Detalhes, Avisos)
        dark: "#0f172a"       // Cor de Fundo Menu Lateral / Dark Mode
    }
};

// ============================================================
// BANCO DE DADOS MOCK (SIMULADO)
// Dados iniciais para preencher a tela
// ============================================================

const DB = {
    usuarioAtual: {
        nome: "Paulo Ricardo",
        avatar: "https://ui-avatars.com/api/?name=Paulo+Ricardo&background=0D9488&color=fff",
        cargo: "Admin Master"
    },
    
    vendedores: [
        { id: 1, nome: "Você", vendas: 4, total: 85000.00, isUser: true, foto: "https://ui-avatars.com/api/?name=Eu&background=random" },
        { id: 2, nome: "Ana Clara", vendas: 2, total: 12400.00, isUser: false, foto: "https://ui-avatars.com/api/?name=Ana&background=random" },
        { id: 3, nome: "Roberto S.", vendas: 1, total: 8200.00, isUser: false, foto: "https://ui-avatars.com/api/?name=Roberto&background=random" }
    ],

    estoque: [
        {
            id: 101,
            titulo: "Trator Valtra A950",
            subtitulo: "Ref: #TR-0921 • Maquinário",
            imagem: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=400",
            valor: 285000.00,
            status: "ATIVO",
            views: 1240,
            canais: ["Site", "OLX"]
        },
        {
            id: 102,
            titulo: "Fazenda Santa Fé",
            subtitulo: "500 Hectares • Pecuária",
            imagem: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400",
            valor: 4500000.00,
            status: "RASCUNHO",
            views: 0,
            canais: []
        }
    ]
};
