// Configuração da API
export const API_BASE_URL = 'http://localhost:8080/api';

// Endpoints
export const API_ENDPOINTS = {
    auth: {
        register: `${API_BASE_URL}/auth/register`,
        login: `${API_BASE_URL}/auth/login`
    },
    products: `${API_BASE_URL}/products`,
    orders: `${API_BASE_URL}/orders`,
    contact: `${API_BASE_URL}/contact`
};

// Utilitários de autenticação
export const Auth = {
    getToken() {
        return localStorage.getItem('token');
    },

    setToken(token) {
        localStorage.setItem('token', token);
    },

    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }
};

// Utilitários de carrinho
export const Cart = {
    getCart() {
        const cartStr = localStorage.getItem('cart');
        return cartStr ? JSON.parse(cartStr) : [];
    },

    setCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
    },

    addItem(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.productId === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: quantity
            });
        }

        this.setCart(cart);
    },

    removeItem(productId) {
        const cart = this.getCart().filter(item => item.productId !== productId);
        this.setCart(cart);
    },

    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.productId === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.setCart(cart);
            }
        }
    },

    clearCart() {
        localStorage.removeItem('cart');
        this.updateCartCount();
    },

    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    },

    updateCartCount() {
        const cart = this.getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountEl = document.getElementById('cartCount');
        if (cartCountEl) {
            cartCountEl.textContent = count;
        }
    }
};

