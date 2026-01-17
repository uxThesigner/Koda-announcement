// ============================================================
// APP.JS - A INTERFACE (Manipulação de DOM & Renderização)
// ============================================================

// 1. Configurar Tailwind (Visual)
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50:  CLIENTE.theme.primary + '10', 
                    500: CLIENTE.theme.primary,        
                    600: CLIENTE.theme.primary, // Simplificado para exemplo       
                    900: CLIENTE.theme.dark            
                },
                accent: { 500: CLIENTE.theme.secondary }
            },
            fontFamily: { sans: ['Inter', 'sans-serif'] }
        }
    }
}

// 2. Inicializador
document.addEventListener('DOMContentLoaded', () => {
    UI.aplicarIdentidade();
    UI.renderizarMenuMobile();
    UI.renderizarDadosDaPagina();
});

// Agrupamos funções de UI para ficar organizado
const UI = {
    
    // Aplica cores, logos e textos do CLIENTE
    aplicarIdentidade: () => {
        document.title = `${CLIENTE.info.nome} - Sistema`;
        
        // Textos e Ícones
        document.querySelectorAll('.app-name').forEach(el => el.textContent = CLIENTE.info.logoTexto);
        document.querySelectorAll('.app-icon').forEach(el => el.className = `fas ${CLIENTE.info.logoIcone} app-icon mr-2`);

        // Dados do Usuário (Usando o Core para pegar o primeiro nome)
        if (typeof DB !== 'undefined') {
            document.querySelectorAll('.user-first-name').forEach(el => el.textContent = Core.getFirstName(DB.usuarioAtual.nome));
            
            // Preenche IDs específicos se existirem na tela
            const els = { 'user-name': DB.usuarioAtual.nome, 'user-role': DB.usuarioAtual.cargo, 'menu-user-name': DB.usuarioAtual.nome, 'menu-user-role': DB.usuarioAtual.cargo };
            for(const [id, val] of Object.entries(els)) {
                const el = document.getElementById(id);
                if(el) el.textContent = val;
            }
            // Avatares
            ['user-avatar', 'user-avatar-mobile', 'menu-user-avatar'].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.src = DB.usuarioAtual.avatar;
            });
        }
    },

    // O tal "Bottom Navigation Bar" centralizado
    renderizarMenuMobile: () => {
        const navContainer = document.getElementById('mobile-navigation');
        if (!navContainer) return;

        const menuItems = [
            { label: 'Início',  icon: 'fas fa-home',      link: 'admin.html' },
            { label: 'Leads',   icon: 'fas fa-users',     link: 'leads.html' },
            { label: 'Novo',    icon: 'fas fa-plus',      action: "toggleModal('modalNovoAnuncio')", isFab: true },
            { label: 'Estoque', icon: 'fas fa-box',       link: 'estoque.html' },
            { label: 'Menu',    icon: 'fas fa-bars',      action: "toggleMenu()" }
        ];

        const currentPage = Core.getCurrentPage(); // Usa a inteligência do functions.js

        let html = '';
        menuItems.forEach(item => {
            if (item.isFab) {
                html += `
                <div class="relative -top-5">
                    <button onclick="${item.action}" class="w-14 h-14 bg-brand-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transform transition active:scale-90 tap-highlight-transparent border-4 border-gray-50 hover:bg-brand-600"><i class="${item.icon}"></i></button>
                </div>`;
            } else {
                const isActive = currentPage === item.link;
                const colorClass = isActive ? 'text-brand-600 font-bold' : 'text-gray-400 hover:text-brand-600 font-medium';
                const clickAction = item.link ? `onclick="window.location.href='${item.link}'"` : `onclick="${item.action}"`;
                
                html += `
                <button ${clickAction} class="flex flex-col items-center w-16 ${colorClass} tap-highlight-transparent transition group">
                    <i class="${item.icon} text-xl mb-1 group-active:scale-90 transition"></i>
                    <span class="text-[10px]">${item.label}</span>
                </button>`;
            }
        });
        navContainer.innerHTML = html;
    },

    // Renderiza conteúdo específico dependendo da página
    renderizarDadosDaPagina: () => {
        // Exemplo: Se tiver lista de estoque na página
        const containerEstoque = document.getElementById('lista-estoque');
        if (containerEstoque && typeof DB !== 'undefined') {
            containerEstoque.innerHTML = DB.estoque.map(item => `
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4 mb-4">
                    <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0"><img src="${item.imagem}" class="w-full h-full object-cover"></div>
                    <div class="flex-1">
                        <h3 class="font-bold text-gray-800">${item.titulo}</h3>
                        <p class="text-lg font-black text-brand-500">${Core.formatMoney(item.valor)}</p>
                    </div>
                </div>
            `).join('');
        }
    }
};
