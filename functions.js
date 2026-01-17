// ============================================================
// FUNCTIONS.JS - A INTELIGÊNCIA (Lógica Pura)
// ============================================================

const Core = {
    // Utilitário: Formatar Dinheiro
    formatMoney: (val) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

    // Utilitário: Detectar Página Atual (Para saber qual ícone pintar)
    getCurrentPage: () => {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    },

    // Lógica: Filtrar Estoque (Não desenha, só devolve os dados filtrados)
    filtrarDados: (dados, status) => {
        if (status === 'todos') return dados;
        return dados.filter(item => item.status === status);
    },

    // Lógica: Obter Iniciais do Nome (Ex: "Paulo Ricardo" -> "Paulo")
    getFirstName: (fullName) => {
        return fullName.split(' ')[0];
    },

    // Lógica: Simulação Financeira (Exemplo para o detalhe.html)
    calcularParcela: (valorTotal, meses = 60, taxa = 1.15) => {
        const entrada = valorTotal * 0.20;
        const financiado = valorTotal - entrada;
        const parcela = (financiado / meses) * taxa;
        return { entrada, parcela };
    }
};
