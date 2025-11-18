import { API_ENDPOINTS, Auth } from './config.js';

// Função genérica para fazer requisições
async function request(url, options = {}) {
    const headers = {
        ...Auth.getAuthHeaders(),
        ...options.headers
    };

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || `Erro: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// API de Autenticação
export const authAPI = {
    async register(userData) {
        return request(API_ENDPOINTS.auth.register, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async login(email, password) {
        return request(API_ENDPOINTS.auth.login, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }
};

// API de Produtos
export const productsAPI = {
    async getAll() {
        return request(API_ENDPOINTS.products);
    },

    async getById(id) {
        return request(`${API_ENDPOINTS.products}?id=${id}`);
    }
};

// API de Pedidos
export const ordersAPI = {
    async create(orderData) {
        return request(API_ENDPOINTS.orders, {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },

    async getByUserId(userId) {
        return request(`${API_ENDPOINTS.orders}?userId=${userId}`);
    }
};

// API de Contato
export const contactAPI = {
    async send(contactData) {
        return request(API_ENDPOINTS.contact, {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
    }
};

