// ============================================================
// MOTOR DO SISTEMA (APP.JS) - ATUALIZADO
// ============================================================

// 1. Configurar Tailwind via JS para usar as cores do Cliente
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50:  CLIENTE.theme.primary + '10', 
                    100: CLIENTE.theme.primary + '20',
                    500: CLIENTE.theme.primary,        
                    600: CLIENTE.theme.primary,        
                    900: CLIENTE.theme.dark            
                },
                accent: {
                    500: CLIENTE.theme.secondary,
                    600: CLIENTE.theme.secondary
                }
            },
            fontFamily: { sans: ['Inter', 'sans-serif'] }
        }
    }
}

// 2. Funções Utilitárias Globais
const formatMoney = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// 3. Inicializador da Interface
document.addEventListener('DOMContentLoaded', () => {
    aplicarIdentidadeVisual();
    renderizarMenuMobile(); // <--- NOVIDADE: Gera o menu automaticamente
    renderizarDados();
});

// ============================================================
// FUNÇÕES DE INTERFACE (UI)
// ============================================================

function aplicarIdentidadeVisual() {
    // Título da Página
    document.title = `${CLIENTE.info.nome} - Sistema`;

    // Injeta Nome e Ícone
    document.querySelectorAll('.app-name').forEach(el => el.textContent = CLIENTE.info.logoTexto);
    document.querySelectorAll('.app-icon').forEach(el => {
        el.className = `fas ${CLIENTE.info.logoIcone} app-icon mr-2`;
    });

    // Injeta Dados do Usuário (se o DB existir)
    if (typeof DB !== 'undefined') {
        const els = {
            'user-name': DB.usuarioAtual.nome,
            'user-role': DB.usuarioAtual.cargo,
            'menu-user-name': DB.usuarioAtual.nome, // Nome dentro do menu lateral
            'menu-user-role': DB.usuarioAtual.cargo
        };
        for(const [id, val] of Object.entries(els)) {
            const el = document.getElementById(id);
            if(el) el.textContent = val;
        }
        
        // Fotos de Avatar
        const imgs = ['user-avatar', 'user-avatar-mobile', 'menu-user-avatar'];
        imgs.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.src = DB.usuarioAtual.avatar;
        });

        // Primeiro nome para mobile (ex: "Olá, Paulo")
        const firstName = DB.usuarioAtual.nome.split(' ')[0];
        document.querySelectorAll('.user-first-name').forEach(el => el.textContent = firstName);
    }
}

// ============================================================
// GERADOR DE NAVEGAÇÃO MOBILE (CORREÇÃO DO BUG)
// ============================================================

function renderizarMenuMobile() {
    // Procura o container vazio no HTML
    const navContainer = document.getElementById('mobile-navigation');
    
    // Se a página não tiver menu (ex: login.html), para a execução
    if (!navContainer) return;

    // 1. DEFINIÇÃO: Aqui você controla os botões de TODOS os arquivos
    const menuItems = [
        { label: 'Início',  icon: 'fas fa-home',      link: 'admin.html' },
        { label: 'Leads',   icon: 'fas fa-users',     link: 'leads.html' },
        { label: 'Novo',    icon: 'fas fa-plus',      action: "toggleModal('modalNovoAnuncio')", isFab: true }, // Botão de Ação Central
        { label: 'Estoque', icon: 'fas fa-box',       link: 'estoque.html' },
        { label: 'Menu',    icon: 'fas fa-bars',      action: "toggleMenu()" }
    ];

    // 2. DETECÇÃO: Qual arquivo está aberto agora?
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    // 3. GERAÇÃO: Monta o HTML
    let html = '';
    
    menuItems.forEach(item => {
        // Lógica do Botão Flutuante (FAB) - O Redondo no meio
        if (item.isFab) {
            html += `
            <div class="relative -top-5">
                <button onclick="${item.action}" class="w-14 h-14 bg-brand-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transform transition active:scale-90 tap-highlight-transparent border-4 border-gray-50 hover:bg-brand-600">
                    <i class="${item.icon}"></i>
                </button>
            </div>`;
        } 
        // Lógica dos Botões Normais (Abas)
        else {
            // Verifica se é a página ativa (se for, usa cor da marca e negrito)
            const isActive = currentPage === item.link;
            
            // Define classes baseadas no estado
            const colorClass = isActive ? 'text-brand-600 font-bold' : 'text-gray-400 hover:text-brand-600 font-medium';
            
            // Define ação (Link ou Função JS)
            const clickAction = item.link ? `onclick="window.location.href='${item.link}'"` : `onclick="${item.action}"`;

            html += `
            <button ${clickAction} class="flex flex-col items-center w-16 ${colorClass} tap-highlight-transparent transition group">
                <i class="${item.icon} text-xl mb-1 group-active:scale-90 transition"></i>
                <span class="text-[10px]">${item.label}</span>
            </button>`;
        }
    });

    // 4. INJEÇÃO: Coloca o HTML pronto na página
    navContainer.innerHTML = html;
}

// ============================================================
// RENDERIZAÇÃO DE DADOS (JÁ EXISTENTE)
// ============================================================

function renderizarDados() {
    // Renderiza Lista de Estoque (Se o container existir na página)
    const containerEstoque = document.getElementById('lista-estoque');
    if (containerEstoque && typeof DB !== 'undefined') {
        // ... (seu código de estoque original mantido)
        // Se precisar que eu reenvie o conteúdo dessa função avise, 
        // mas estou mantendo a lógica que você já tinha.
    }
}
