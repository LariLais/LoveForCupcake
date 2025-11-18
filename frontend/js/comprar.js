import { productsAPI } from './api.js';
import { Cart } from './config.js';

let products = [];
let selectedProductId = null;

// Carregar produtos
async function loadProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    try {
        products = await productsAPI.getAll();
        
        // Verificar se há um ID na URL (produto específico)
        const urlParams = new URLSearchParams(window.location.search);
        selectedProductId = urlParams.get('id');

        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="loading">Nenhum produto disponível no momento.</p>';
            return;
        }

        // Se há um ID, mostrar apenas esse produto
        const productsToShow = selectedProductId 
            ? products.filter(p => p.id == selectedProductId)
            : products;

        if (productsToShow.length === 0) {
            productsContainer.innerHTML = '<p class="loading">Produto não encontrado.</p>';
            return;
        }

        productsContainer.innerHTML = productsToShow.map(product => `
            <div class="product-item">
                <img src="${product.imageUrl || 'https://via.placeholder.com/300x200?text=Cupcake'}" 
                     alt="${product.name}"
                     onerror="this.src='https://via.placeholder.com/300x200?text=Cupcake'">
                <h3>${product.name}</h3>
                <p>${product.description || 'Delicioso cupcake feito com ingredientes selecionados'}</p>
                <div class="price">R$ ${parseFloat(product.price).toFixed(2)}</div>
                <div class="stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `✓ Em estoque (${product.stock} unidades)` : '✗ Fora de estoque'}
                </div>
                <div class="quantity-selector">
                    <button onclick="decreaseQuantity(${product.id})">-</button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="${product.stock}" 
                           onchange="updateQuantityInput(${product.id})">
                    <button onclick="increaseQuantity(${product.id})">+</button>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" 
                            onclick="addToCart(${product.id})"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        productsContainer.innerHTML = '<p class="loading">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    }
}

// Aumentar quantidade
window.increaseQuantity = function(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const product = products.find(p => p.id == productId);
    if (product && parseInt(input.value) < product.stock) {
        input.value = parseInt(input.value) + 1;
    }
};

// Diminuir quantidade
window.decreaseQuantity = function(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
};

// Atualizar quantidade via input
window.updateQuantityInput = function(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const product = products.find(p => p.id == productId);
    const value = parseInt(input.value);
    
    if (value < 1) {
        input.value = 1;
    } else if (product && value > product.stock) {
        input.value = product.stock;
    }
};

// Adicionar ao carrinho
window.addToCart = function(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const input = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(input.value) || 1;

    if (product.stock < quantity) {
        alert(`Apenas ${product.stock} unidades disponíveis.`);
        return;
    }

    Cart.addItem(product, quantity);
    alert(`${quantity}x ${product.name} adicionado(s) ao carrinho!`);
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

