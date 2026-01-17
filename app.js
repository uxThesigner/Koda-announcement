// ============================================================
// SYSTEM ENGINE (NÃO EDITE A MENOS QUE SAIBA O QUE ESTÁ FAZENDO)
// ============================================================

// 1. Configurar Tailwind via JS para usar as cores do Cliente
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Mapeia 'brand' para a cor configurada em _config.js
                brand: {
                    50:  CLIENTE.theme.primary + '10', // Transparência simulada
                    100: CLIENTE.theme.primary + '20',
                    500: CLIENTE.theme.primary,        // Cor Base
                    600: CLIENTE.theme.primary,        // Hover (Simplificado)
                    900: CLIENTE.theme.dark            // Cor Escura
                },
                accent: {
                    500: CLIENTE.theme.secondary
                }
            },
            fontFamily: { sans: ['Inter', 'sans-serif'] }
        }
    }
}

// 2. Funções Utilitárias
const formatMoney = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// 3. Inicializador da Interface
document.addEventListener('DOMContentLoaded', () => {
    aplicarIdentidadeVisual();
    renderizarDados();
});

function aplicarIdentidadeVisual() {
    // Muda Título da Página
    document.title = `${CLIENTE.info.nome} - Admin`;

    // Injeta Nome do App onde tiver a classe .app-name
    document.querySelectorAll('.app-name').forEach(el => el.textContent = CLIENTE.info.logoTexto);
    
    // Injeta Ícone onde tiver a classe .app-icon
    document.querySelectorAll('.app-icon').forEach(el => {
        el.className = `fas ${CLIENTE.info.logoIcone} app-icon mr-2`; // Reseta e aplica
    });

    // Injeta Dados do Usuário Logado
    const userImg = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    if(userImg) userImg.src = DB.usuarioAtual.avatar;
    if(userName) userName.textContent = DB.usuarioAtual.nome;
}

function renderizarDados() {
    // Renderiza Lista de Estoque (Se o container existir na página)
    const containerEstoque = document.getElementById('lista-estoque');
    if (containerEstoque) {
        containerEstoque.innerHTML = DB.estoque.map(item => `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4 mb-4">
                <div class="w-full md:w-32 h-24 bg-gray-200 rounded-lg relative overflow-hidden group">
                    <img src="${item.imagem}" class="w-full h-full object-cover">
                    <span class="absolute top-1 left-1 bg-brand-500 text-white text-[10px] font-bold px-2 rounded">${item.status}</span>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-gray-800">${item.titulo}</h3>
                    <p class="text-xs text-gray-500 mb-1">${item.subtitulo}</p>
                    <p class="text-lg font-black text-brand-500">${formatMoney(item.valor)}</p>
                    <div class="mt-2 flex gap-1">
                        ${item.canais.map(c => `<span class="bg-gray-100 text-[10px] px-2 rounded font-bold text-gray-600">${c}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}
