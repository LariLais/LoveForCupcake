import { productsAPI } from './api.js';
import { Cart } from './config.js';

// Carregar produtos
async function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    try {
        const products = await productsAPI.getAll();
        
        if (products.length === 0) {
            productsGrid.innerHTML = '<p class="loading">Nenhum produto disponível no momento.</p>';
            return;
        }

        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.imageUrl || 'https://via.placeholder.com/300x250?text=Cupcake'}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.src='https://via.placeholder.com/300x250?text=Cupcake'">
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description || 'Delicioso cupcake feito com ingredientes selecionados'}</p>
                    <div class="product-price">R$ ${parseFloat(product.price).toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-outline" onclick="viewProduct(${product.id})">Ver Detalhes</button>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        productsGrid.innerHTML = '<p class="loading">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    }
}

// Adicionar ao carrinho
window.addToCart = async function(productId) {
    try {
        const products = await productsAPI.getAll();
        const product = products.find(p => p.id === productId);
        
        if (product) {
            Cart.addItem(product, 1);
            alert(`${product.name} adicionado ao carrinho!`);
        }
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        alert('Erro ao adicionar produto ao carrinho.');
    }
};

// Ver detalhes do produto
window.viewProduct = function(productId) {
    window.location.href = `comprar.html?id=${productId}`;
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

