import { authAPI } from './api.js';
import { Auth } from './config.js';

// Handler do formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };
    
    const messageDiv = document.getElementById('authMessage');
    messageDiv.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        const response = await authAPI.register(userData);
        
        // Salvar token e dados do usuário
        Auth.setToken(response.token);
        Auth.setUser({
            id: response.userId,
            email: response.email,
            name: response.name,
            role: response.role,
            phone: userData.phone,
            address: userData.address
        });
        
        messageDiv.innerHTML = '<div class="message message-success">Cadastro realizado com sucesso! Redirecionando...</div>';
        
        // Redirecionar
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        messageDiv.innerHTML = `<div class="message message-error">${error.message || 'Erro ao realizar cadastro. Tente novamente.'}</div>`;
    }
});

// Verificar se já está logado
if (Auth.isAuthenticated()) {
    window.location.href = 'index.html';
}

