import { Auth } from './config.js';
import { ordersAPI } from './api.js';

// Verificar autenticação
if (!Auth.isAuthenticated()) {
    window.location.href = 'login.html?redirect=meus-pedidos.html';
}

// Carregar pedidos
async function loadOrders() {
    const pedidosContent = document.getElementById('pedidosContent');
    if (!pedidosContent) return;

    try {
        const user = Auth.getUser();
        if (!user) {
            window.location.href = 'login.html?redirect=meus-pedidos.html';
            return;
        }

        // Obter userId do usuário autenticado
        const userId = user.id;
        
        if (!userId) {
            pedidosContent.innerHTML = `
                <div class="message message-error">
                    Erro ao carregar pedidos. Faça login novamente.
                </div>
            `;
            return;
        }
        
        const orders = await ordersAPI.getByUserId(userId);

        if (orders.length === 0) {
            pedidosContent.innerHTML = `
                <div class="empty-orders">
                    <div class="empty-orders-icon">📦</div>
                    <h2>Você ainda não fez nenhum pedido</h2>
                    <p>Que tal começar a comprar nossos deliciosos cupcakes?</p>
                    <a href="comprar.html" class="btn btn-primary">Ir às Compras</a>
                </div>
            `;
            return;
        }

        pedidosContent.innerHTML = `
            <div class="orders-list">
                ${orders.map(order => `
                    <div class="order-card">
                        <div class="order-header">
                            <div class="order-info">
                                <h3>Pedido #${order.id}</h3>
                                <div class="order-number">Número: ${order.id}</div>
                                <div class="order-date">Data: ${formatDate(order.createdAt)}</div>
                            </div>
                            <div class="order-status ${order.status.toLowerCase()}">
                                ${getStatusLabel(order.status)}
                            </div>
                        </div>
                        
                        <div class="order-items">
                            ${order.items.map(item => `
                                <div class="order-item">
                                    <div class="order-item-info">
                                        <div class="order-item-name">${item.productName}</div>
                                        <div class="order-item-details">
                                            Quantidade: ${item.quantity} x R$ ${parseFloat(item.price).toFixed(2)}
                                        </div>
                                    </div>
                                    <div class="order-item-price">
                                        R$ ${parseFloat(item.subtotal).toFixed(2)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="order-footer">
                            <div>
                                <div class="order-total">Total: R$ ${parseFloat(order.total).toFixed(2)}</div>
                                <div class="order-address">📍 ${order.shippingAddress}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        pedidosContent.innerHTML = `
            <div class="message message-error">
                Erro ao carregar pedidos. Tente novamente mais tarde.
            </div>
        `;
    }
}

// Formatar data
function formatDate(dateString) {
    if (!dateString) return 'Data não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Obter label do status
function getStatusLabel(status) {
    const labels = {
        'PENDING': 'Pendente',
        'CONFIRMED': 'Confirmado',
        'PREPARING': 'Em Preparação',
        'READY': 'Pronto',
        'DELIVERED': 'Entregue',
        'CANCELLED': 'Cancelado'
    };
    return labels[status] || status;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

