import { Cart } from './config.js';

// Renderizar carrinho
function renderCart() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;

    const cart = Cart.getCart();

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos ao carrinho para continuar comprando</p>
                <a href="comprar.html" class="btn btn-primary">Ir às Compras</a>
            </div>
        `;
        return;
    }

    const total = Cart.getTotal();

    cartContent.innerHTML = `
        <div class="cart-container">
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.imageUrl || 'https://via.placeholder.com/120x120?text=Cupcake'}" 
                             alt="${item.name}" 
                             class="cart-item-image"
                             onerror="this.src='https://via.placeholder.com/120x120?text=Cupcake'">
                        <div class="cart-item-content">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <div class="cart-item-price">R$ ${parseFloat(item.price).toFixed(2)}</div>
                            <div class="cart-item-actions">
                                <div class="quantity-control">
                                    <button onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                                    <input type="number" value="${item.quantity}" min="1" 
                                           onchange="updateQuantity(${item.productId}, this.value)">
                                    <button onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                                </div>
                                <button class="remove-item" onclick="removeItem(${item.productId})">
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <h2>Resumo do Pedido</h2>
                <div class="summary-row">
                    <span class="summary-label">Subtotal</span>
                    <span class="summary-value">R$ ${total.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Frete</span>
                    <span class="summary-value">A calcular</span>
                </div>
                <div class="summary-row total">
                    <span class="summary-label">Total</span>
                    <span class="summary-value total">R$ ${total.toFixed(2)}</span>
                </div>
                <a href="pagamento.html" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">
                    Finalizar Compra
                </a>
                <a href="comprar.html" class="btn btn-outline" style="width: 100%; margin-top: 0.5rem;">
                    Continuar Comprando
                </a>
            </div>
        </div>
    `;
}

// Atualizar quantidade
window.updateQuantity = function(productId, quantity) {
    quantity = parseInt(quantity);
    if (quantity < 1) {
        removeItem(productId);
    } else {
        Cart.updateQuantity(productId, quantity);
        renderCart();
        Cart.updateCartCount();
    }
};

// Remover item
window.removeItem = function(productId) {
    if (confirm('Deseja remover este item do carrinho?')) {
        Cart.removeItem(productId);
        renderCart();
        Cart.updateCartCount();
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

