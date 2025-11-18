import { productsAPI } from './api.js';

// Carregar produtos na galeria
async function loadGalleryProducts() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    try {
        galleryGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        
        const products = await productsAPI.getAll();
        
        if (products.length === 0) {
            galleryGrid.innerHTML = '<p class="loading">Nenhum produto disponível no momento.</p>';
            return;
        }

        // Mostrar apenas os primeiros 6 produtos na home
        const featuredProducts = products.slice(0, 6);
        
        galleryGrid.innerHTML = featuredProducts.map(product => `
            <div class="gallery-item">
                <img src="${product.imageUrl || 'https://via.placeholder.com/300x200?text=Cupcake'}" 
                     alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Cupcake'">
                <div class="gallery-item-content">
                    <h3>${product.name}</h3>
                    <p>${product.description || 'Delicioso cupcake feito com ingredientes selecionados'}</p>
                    <div class="price">R$ ${parseFloat(product.price).toFixed(2)}</div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        galleryGrid.innerHTML = '<p class="loading">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryProducts();
});

