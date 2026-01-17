// ============================================================
// 3. MOTOR DE INTERFACE MOBILE (app.js)
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
    // Sequência de Inicialização
    System.initTheme();           
    UI.aplicarIdentidade();       
    UI.atualizarTextos();         
    UI.renderizarDadosDaPagina();
    
    // Tenta renderizar o menu imediatamente
    UI.renderizarMenuMobile();

    // Fallback: Tenta de novo após 50ms caso o HTML tenha demorado
    setTimeout(UI.renderizarMenuMobile, 50);

    // Ativa gestos de toque
    UI.initDraggables(); 
});

const UI = {

    // --- IDENTIDADE ---
    aplicarIdentidade: () => {
        document.title = `${CLIENTE.info.nome}`;
        document.querySelectorAll('.app-name').forEach(el => el.textContent = CLIENTE.info.logoTexto);
        document.querySelectorAll('.app-icon').forEach(el => el.className = `fas ${CLIENTE.info.logoIcone} app-icon mr-2`);

        if (typeof DB !== 'undefined') {
            document.querySelectorAll('.user-first-name').forEach(el => el.textContent = Core.getFirstName(DB.usuarioAtual.nome));
            
            const els = { 'user-name': DB.usuarioAtual.nome, 'user-role': DB.usuarioAtual.cargo, 'menu-user-name': DB.usuarioAtual.nome, 'menu-user-role': DB.usuarioAtual.cargo };
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

    // --- TEXTOS ---
    atualizarTextos: () => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = System.t(key);
        });
        UI.renderizarMenuMobile(); // Redesenha o menu com novos textos
    },

    // --- MENU MOBILE (O CORAÇÃO DO APP) ---
    renderizarMenuMobile: () => {
        const navContainer = document.getElementById('mobile-navigation');
        
        // Se não achou o container, aborta (evita erro no console)
        if (!navContainer) return;

        const menuItems = [
            { label: System.t('nav_home'),  icon: 'fas fa-home',      link: 'admin.html' },
            { label: System.t('nav_leads'), icon: 'fas fa-users',     link: 'leads.html' },
            // BOTÃO CENTRAL (FAB)
            { label: System.t('btn_new'),   icon: 'fas fa-plus',      action: "UI.toggleModal('modalNovoAnuncio')", isFab: true },
            { label: System.t('nav_stock'), icon: 'fas fa-box',       link: 'estoque.html' },
            { label: System.t('nav_menu'),  icon: 'fas fa-bars',      action: "UI.toggleMenu()" }
        ];

        // Normaliza a página atual para funcionar se tiver query params
        const path = window.location.pathname;
        const currentPage = path.substring(path.lastIndexOf('/') + 1).split('?')[0] || 'index.html';

        let html = '';
        menuItems.forEach(item => {
            if (item.isFab) {
                // FAB Central
                html += `
                <div class="relative -top-6">
                    <button onclick="${item.action}" class="w-14 h-14 bg-brand-500 rounded-full shadow-lg shadow-brand-500/40 flex items-center justify-center text-white text-2xl transform transition active:scale-90 tap-highlight-transparent border-4 border-gray-50 hover:bg-brand-600 dark:border-gray-900">
                        <i class="${item.icon}"></i>
                    </button>
                </div>`;
            } else {
                // Botões Normais
                const isActive = currentPage === item.link;
                // Se ativo: Brand Color. Se inativo: Gray.
                const colorClass = isActive 
                    ? 'text-brand-600 font-bold dark:text-brand-500' 
                    : 'text-gray-400 hover:text-brand-600 font-medium dark:text-gray-500 dark:hover:text-brand-400';
                
                const clickAction = item.link ? `onclick="window.location.href='${item.link}'"` : `onclick="${item.action}"`;

                html += `
                <button ${clickAction} class="flex flex-col items-center justify-center w-16 h-full ${colorClass} tap-highlight-transparent transition group pt-2 pb-1">
                    <i class="${item.icon} text-xl mb-1 group-active:scale-75 transition duration-200"></i>
                    <span class="text-[10px] tracking-wide">${item.label}</span>
                </button>`;
            }
        });
        navContainer.innerHTML = html;
    },

    // --- INTERATIVIDADE (MODAIS E MENUS) ---
    toggleModal: (id) => {
        const modal = document.getElementById(id);
        const content = id === 'modalNovoAnuncio' ? document.getElementById('anuncioContent') : null;
        
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden'); 
            modal.classList.add('flex'); 
            document.body.style.overflow = 'hidden'; // Trava scroll do fundo
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

    // --- GESTOS DE ARRASTAR (SWIPE DOWN TO CLOSE) ---
    initDraggables: () => {
        if (!('ontouchstart' in window)) return;

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
                // Só permite arrastar pra baixo
                if (diff > 0) { 
                    e.preventDefault(); 
                    currentTranslate = diff; 
                    content.style.transform = `translateY(${diff}px)`; 
                } 
            }, { passive: false });
            
            handle.addEventListener('touchend', () => { 
                isDragging = false; 
                content.classList.add('smooth-transition'); 
                // Se arrastou mais de 100px, fecha. Senão, volta.
                if (currentTranslate > 100) { 
                    content.style.transform = `translateY(100%)`; 
                    setTimeout(closeCallback, 200); 
                } else { 
                    content.style.transform = ''; 
                } 
                currentTranslate = 0; 
            });
        };

        setup('menuHandle', 'menuContent', UI.toggleMenu);
        setup('anuncioHandle', 'anuncioContent', () => UI.toggleModal('modalNovoAnuncio'));
    },

    // --- DADOS ---
    renderizarDadosDaPagina: () => {
        const containerEstoque = document.getElementById('lista-estoque');
        if (containerEstoque && typeof DB !== 'undefined') {
            const dados = DB.estoque;
            if(dados.length === 0) {
                containerEstoque.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-gray-400"><i class="fas fa-box-open text-4xl mb-3"></i><p>Vazio por enquanto.</p></div>`;
                return;
            }
            containerEstoque.innerHTML = dados.map(item => `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex gap-3 mb-3 active:scale-[0.98] transition duration-150">
                    <div class="w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden shrink-0">
                        <img src="${item.imagem}" class="w-full h-full object-cover">
                        <span class="absolute top-1 left-1 bg-brand-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wide">${item.status}</span>
                    </div>
                    <div class="flex-1 flex flex-col justify-center">
                        <h3 class="font-bold text-gray-800 dark:text-white text-sm leading-tight mb-1">${item.titulo}</h3>
                        <p class="text-[10px] text-gray-500 dark:text-gray-400 mb-1 line-clamp-1">${item.subtitulo}</p>
                        <p class="text-lg font-black text-brand-600 dark:text-brand-400">${Core.formatMoney(item.valor)}</p>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-chevron-right text-gray-300 dark:text-gray-600"></i>
                    </div>
                </div>
            `).join('');
        }
    }
};
