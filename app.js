// ============================================================
// APP.JS - A INTERFACE (Manipulação de DOM & Renderização)
// ============================================================

// 1. Configurar Tailwind (Visual & Dark Mode)
tailwind.config = {
    darkMode: 'class', // Habilita troca de tema via classe .dark
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

// 2. Inicializador da Página
document.addEventListener('DOMContentLoaded', () => {
    // A ordem importa:
    System.initTheme();           // 1. Aplica Dark/Light mode salvo
    UI.aplicarIdentidade();       // 2. Aplica Logos e Cores
    UI.atualizarTextos();         // 3. Traduz a página (e gera o menu)
    UI.renderizarDadosDaPagina(); // 4. Preenche listas (Estoque, Leads)
});

// 3. Objeto de Controle de Interface (UI)
const UI = {

    // --- IDENTIDADE VISUAL ---
    aplicarIdentidade: () => {
        document.title = `${CLIENTE.info.nome} - Sistema`;

        // Textos e Ícones da Marca
        document.querySelectorAll('.app-name').forEach(el => el.textContent = CLIENTE.info.logoTexto);
        document.querySelectorAll('.app-icon').forEach(el => el.className = `fas ${CLIENTE.info.logoIcone} app-icon mr-2`);

        // Dados do Usuário (Nome, Cargo, Foto)
        if (typeof DB !== 'undefined') {
            document.querySelectorAll('.user-first-name').forEach(el => el.textContent = Core.getFirstName(DB.usuarioAtual.nome));

            const els = { 
                'user-name': DB.usuarioAtual.nome, 
                'user-role': DB.usuarioAtual.cargo, 
                'menu-user-name': DB.usuarioAtual.nome, 
                'menu-user-role': DB.usuarioAtual.cargo 
            };
            
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

    // --- INTERNACIONALIZAÇÃO (i18n) ---
    atualizarTextos: () => {
        // 1. Procura elementos com data-i18n="chave" e traduz
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = System.t(key);
        });

        // 2. Regenera o menu mobile para aplicar a tradução nos botões
        UI.renderizarMenuMobile();
    },

    // --- MENU MOBILE INTELIGENTE ---
    renderizarMenuMobile: () => {
        const navContainer = document.getElementById('mobile-navigation');
        if (!navContainer) return;

        // Lista de Botões (Usando System.t para traduzir os rótulos)
        const menuItems = [
            { label: System.t('nav_home'),  icon: 'fas fa-home',      link: 'admin.html' },
            { label: System.t('nav_leads'), icon: 'fas fa-users',     link: 'leads.html' },
            { label: System.t('btn_new'),   icon: 'fas fa-plus',      action: "toggleModal('modalNovoAnuncio')", isFab: true },
            { label: System.t('nav_stock'), icon: 'fas fa-box',       link: 'estoque.html' },
            { label: System.t('nav_menu'),  icon: 'fas fa-bars',      action: "toggleMenu()" }
        ];

        const currentPage = Core.getCurrentPage(); 

        let html = '';
        menuItems.forEach(item => {
            if (item.isFab) {
                // Botão Flutuante Central (FAB)
                html += `
                <div class="relative -top-5">
                    <button onclick="${item.action}" class="w-14 h-14 bg-brand-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transform transition active:scale-90 tap-highlight-transparent border-4 border-gray-50 hover:bg-brand-600 dark:border-gray-900">
                        <i class="${item.icon}"></i>
                    </button>
                </div>`;
            } else {
                // Botões Normais de Navegação
                const isActive = currentPage === item.link;
                const colorClass = isActive ? 'text-brand-600 font-bold dark:text-brand-500' : 'text-gray-400 hover:text-brand-600 font-medium dark:text-gray-500 dark:hover:text-brand-400';
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

    // --- RENDERIZAÇÃO DE DADOS (Listas) ---
    renderizarDadosDaPagina: () => {
        // Verifica se existe container de estoque na página atual
        const containerEstoque = document.getElementById('lista-estoque');
        
        if (containerEstoque && typeof DB !== 'undefined') {
            const dados = DB.estoque;

            if(dados.length === 0) {
                containerEstoque.innerHTML = `<p class="text-center text-gray-400 py-4">Nenhum item encontrado.</p>`;
                return;
            }

            containerEstoque.innerHTML = dados.map(item => `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 mb-4 transition hover:shadow-md">
                    <div class="w-full md:w-32 h-32 md:h-24 bg-gray-200 rounded-lg relative overflow-hidden group shrink-0">
                        <img src="${item.imagem}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                        <span class="absolute top-1 left-1 bg-brand-500 text-white text-[10px] font-bold px-2 rounded shadow-sm">${item.status}</span>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-bold text-gray-800 dark:text-white text-lg md:text-base">${item.titulo}</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">${item.subtitulo}</p>
                        <p class="text-xl font-black text-brand-600 dark:text-brand-400">${Core.formatMoney(item.valor)}</p>
                        <div class="mt-2 flex gap-1 flex-wrap">
                            ${item.canais.map(c => `<span class="bg-gray-100 dark:bg-gray-700 text-[10px] px-2 py-0.5 rounded font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">${c}</span>`).join('')}
                        </div>
                    </div>
                    <div class="flex items-center justify-end">
                        <button class="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition p-2"><i class="fas fa-ellipsis-v"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }
};
