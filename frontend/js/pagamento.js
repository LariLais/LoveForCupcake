import { Cart, Auth } from './config.js';
import { ordersAPI } from './api.js';
import { showMessage } from './main.js';

// Renderizar checkout
function renderCheckout() {
    const checkoutContent = document.getElementById('checkoutContent');
    if (!checkoutContent) return;

    // Verificar se usuário está logado
    if (!Auth.isAuthenticated()) {
        checkoutContent.innerHTML = `
            <div class="message message-error">
                <h2>Você precisa estar logado para finalizar a compra</h2>
                <p>Faça login ou cadastre-se para continuar</p>
                <div style="margin-top: 1rem;">
                    <a href="login.html" class="btn btn-primary">Fazer Login</a>
                    <a href="cadastro.html" class="btn btn-outline" style="margin-left: 1rem;">Cadastrar</a>
                </div>
            </div>
        `;
        return;
    }

    const cart = Cart.getCart();
    if (cart.length === 0) {
        checkoutContent.innerHTML = `
            <div class="message message-error">
                <h2>Seu carrinho está vazio</h2>
                <a href="comprar.html" class="btn btn-primary" style="margin-top: 1rem;">Ir às Compras</a>
            </div>
        `;
        return;
    }

    const user = Auth.getUser();
    const total = Cart.getTotal();

    checkoutContent.innerHTML = `
        <div class="checkout-container">
            <div class="checkout-form">
                <form id="checkoutForm">
                    <div class="form-section">
                        <h3>Endereço de Entrega</h3>
                        <div class="form-group">
                            <label for="shippingAddress">Endereço Completo</label>
                            <textarea id="shippingAddress" name="shippingAddress" required 
                                      placeholder="Rua, Número, Bairro, Cidade, CEP">${user?.address || ''}</textarea>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Forma de Pagamento</h3>
                        <div class="payment-methods">
                            <div class="payment-method">
                                <input type="radio" id="payment-card" name="paymentMethod" value="card" checked>
                                <label for="payment-card">💳 Cartão de Crédito/Débito</label>
                            </div>
                            <div class="payment-method">
                                <input type="radio" id="payment-pix" name="paymentMethod" value="pix">
                                <label for="payment-pix">📱 PIX</label>
                            </div>
                            <div class="payment-method">
                                <input type="radio" id="payment-delivery" name="paymentMethod" value="delivery">
                                <label for="payment-delivery">💰 Pagar na Entrega</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-large" style="width: 100%;">
                        Finalizar Pedido
                    </button>
                </form>
            </div>

            <div class="order-summary">
                <h2>Resumo do Pedido</h2>
                ${cart.map(item => `
                    <div class="summary-item">
                        <div class="summary-item-name">${item.name}</div>
                        <div class="summary-item-quantity">x${item.quantity}</div>
                        <div class="summary-item-price">R$ ${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}
                <div class="summary-total">
                    <span>Total</span>
                    <span class="summary-total-value">R$ ${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;

    // Adicionar handler do formulário
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// Processar checkout
async function handleCheckout(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const shippingAddress = formData.get('shippingAddress');
    const paymentMethod = formData.get('paymentMethod');

    if (!shippingAddress.trim()) {
        showMessage('Por favor, informe o endereço de entrega.', 'error');
        return;
    }

    const cart = Cart.getCart();
    const user = Auth.getUser();

    const orderData = {
        items: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        })),
        shippingAddress: shippingAddress
    };

    try {
        // O backend irá identificar o usuário através do token JWT
        // Não precisamos passar o userId explicitamente
        const order = await ordersAPI.create(orderData);
        
        // Limpar carrinho
        Cart.clearCart();
        
        showMessage('Pedido realizado com sucesso!', 'success');
        
        // Redirecionar para página de pedidos
        setTimeout(() => {
            window.location.href = 'meus-pedidos.html';
        }, 2000);
    } catch (error) {
        console.error('Erro ao finalizar pedido:', error);
        showMessage('Erro ao finalizar pedido. Tente novamente.', 'error');
    }
}

// Obter userId do backend
async function getUserId() {
    const user = Auth.getUser();
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    
    // O userId será obtido do backend através do email no token JWT
    // Por enquanto, vamos usar uma abordagem simplificada
    // Em produção, o token JWT deveria conter o userId
    // Vamos buscar o userId fazendo uma requisição ao backend
    try {
        // Por enquanto, vamos assumir que o backend retorna o userId no login
        // Se não tiver, vamos usar o email para buscar
        if (user.id) {
            return user.id;
        }
        
        // Se não tiver ID, vamos precisar buscar do backend
        // Por enquanto, vamos lançar um erro pedindo para fazer login novamente
        throw new Error('Sessão expirada. Faça login novamente.');
    } catch (error) {
        throw error;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
});

