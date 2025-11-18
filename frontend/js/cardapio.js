import { productsAPI } from './api.js';
import { Cart } from './config.js';

// Carregar produtos
async function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    try {
        const result = await productsAPI.getAll();
        const products = Array.isArray(result) ? result : [];

        if (products.length === 0) {
            productsGrid.innerHTML = '<p class="loading">Nenhum produto disponível no momento.</p>';
            return;
        }

        const originIsFile = window.location.protocol === 'file:';

        productsGrid.innerHTML = products.map(product => {
            const rawUrl = product && product.imageUrl ? String(product.imageUrl) : '';
            // If page is opened via file://, remove leading slash so relative path works
            const imageSrc = rawUrl
                ? (originIsFile && rawUrl.startsWith('/') ? rawUrl.substring(1) : rawUrl)
                : 'https://via.placeholder.com/300x250?text=Cupcake';

            const price = product && product.price ? parseFloat(product.price).toFixed(2) : '0.00';

            return `
            <div class="product-card">
                <img src="${imageSrc}" 
                     alt="${product && product.name ? product.name : ''}" 
                     class="product-image"
                     onerror="this.src='https://via.placeholder.com/300x250?text=Cupcake'">
                <div class="product-content">
                    <h3 class="product-name">${product && product.name ? product.name : ''}</h3>
                    <p class="product-description">${product && product.description ? product.description : 'Delicioso cupcake feito com ingredientes selecionados'}</p>
                    <div class="product-price">R$ ${price}</div>
                    <div class="product-actions">
                        <button class="btn btn-outline" onclick="viewProduct(${product && product.id ? product.id : 'null'})">Ver Detalhes</button>
                        <button class="btn btn-primary" onclick="addToCart(${product && product.id ? product.id : 'null'})">Adicionar</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
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

