// ============================================================
// APP.JS - A INTERFACE (Manipulação de DOM & Renderização)
// ============================================================

tailwind.config = {
    darkMode: 'class',
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

document.addEventListener('DOMContentLoaded', () => {
    System.initTheme();           
    UI.aplicarIdentidade();       
    UI.atualizarTextos();         
    UI.renderizarDadosDaPagina();
    
    // NOVO: Inicializa os arrastáveis (Draggable) automaticamente
    UI.initDraggables(); 
});

const UI = {

    // --- IDENTIDADE VISUAL ---
    aplicarIdentidade: () => {
        document.title = `${CLIENTE.info.nome} - Sistema`;
        document.querySelectorAll('.app-name').forEach(el => el.textContent = CLIENTE.info.logoTexto);
        document.querySelectorAll('.app-icon').forEach(el => el.className = `fas ${CLIENTE.info.logoIcone} app-icon mr-2`);

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
            ['user-avatar', 'user-avatar-mobile', 'menu-user-avatar'].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.src = DB.usuarioAtual.avatar;
            });
        }
    },

    // --- INTERNACIONALIZAÇÃO ---
    atualizarTextos: () => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = System.t(key);
        });
        UI.renderizarMenuMobile();
    },

    // --- INTERATIVIDADE (MODAIS E MENUS) ---
    // Movi do HTML para cá
    
    toggleModal: (id) => {
        const modal = document.getElementById(id);
        const content = id === 'modalNovoAnuncio' ? document.getElementById('anuncioContent') : null;
        
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden'); 
            modal.classList.add('flex'); 
            document.body.style.overflow = 'hidden';
            if(content) { 
                content.style.transform = ''; 
                content.classList.remove('smooth-transition'); 
            }
        } else { 
            modal.classList.add('hidden'); 
            modal.classList.remove('flex'); 
            document.body.style.overflow = ''; 
        }
    },

    toggleMenu: () => {
        const menu = document.getElementById('mobileMenuSheet'); 
        const content = document.getElementById('menuContent');
        
        if (menu.classList.contains('hidden')) { 
            menu.classList.remove('hidden'); 
            document.body.style.overflow = 'hidden'; 
            content.style.transform = ''; 
            content.classList.remove('smooth-transition'); 
        } else { 
            menu.classList.add('hidden'); 
            document.body.style.overflow = ''; 
        }
    },

    // Inicializa a lógica de arrastar (Touch) para fechar menus
    initDraggables: () => {
        if (!('ontouchstart' in window)) return; // Só roda em touch devices

        const setup = (handleId, contentId, closeCallback) => {
            const handle = document.getElementById(handleId); 
            const content = document.getElementById(contentId);
            if(!handle || !content) return;

            let startY = 0; let currentTranslate = 0; let isDragging = false;
            
            handle.addEventListener('touchstart', (e) => { 
                startY = e.touches[0].clientY; 
                isDragging = true; 
                content.classList.remove('smooth-transition'); 
            }, { passive: false });
            
            handle.addEventListener('touchmove', (e) => { 
                if (!isDragging) return; 
                const currentY = e.touches[0].clientY; 
                const diff = currentY - startY; 
                if (diff > 0) { 
                    e.preventDefault(); 
                    currentTranslate = diff; 
                    content.style.transform = `translateY(${diff}px)`; 
                } 
            }, { passive: false });
            
            handle.addEventListener('touchend', () => { 
                isDragging = false; 
                content.classList.add('smooth-transition'); 
                if (currentTranslate > 100) { 
                    content.style.transform = `translateY(100%)`; 
                    setTimeout(closeCallback, 200); 
                } else { 
                    content.style.transform = ''; 
                } 
                currentTranslate = 0; 
            });
        };

        // Configura os dois elementos arrastáveis padrão
        setup('menuHandle', 'menuContent', UI.toggleMenu);
        setup('anuncioHandle', 'anuncioContent', () => UI.toggleModal('modalNovoAnuncio'));
    },

    // --- MENU MOBILE ---
    renderizarMenuMobile: () => {
        const navContainer = document.getElementById('mobile-navigation');
        if (!navContainer) return;

        // IMPORTANTE: Agora as ações chamam UI.toggle...
        const menuItems = [
            { label: System.t('nav_home'),  icon: 'fas fa-home',      link: 'admin.html' },
            { label: System.t('nav_leads'), icon: 'fas fa-users',     link: 'leads.html' },
            { label: System.t('btn_new'),   icon: 'fas fa-plus',      action: "UI.toggleModal('modalNovoAnuncio')", isFab: true },
            { label: System.t('nav_stock'), icon: 'fas fa-box',       link: 'estoque.html' },
            { label: System.t('nav_menu'),  icon: 'fas fa-bars',      action: "UI.toggleMenu()" }
        ];

        const currentPage = Core.getCurrentPage(); 

        let html = '';
        menuItems.forEach(item => {
            if (item.isFab) {
                html += `
                <div class="relative -top-5">
                    <button onclick="${item.action}" class="w-14 h-14 bg-brand-500 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transform transition active:scale-90 tap-highlight-transparent border-4 border-gray-50 hover:bg-brand-600 dark:border-gray-900">
                        <i class="${item.icon}"></i>
                    </button>
                </div>`;
            } else {
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

    // --- RENDERIZAÇÃO DE DADOS ---
    renderizarDadosDaPagina: () => {
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
