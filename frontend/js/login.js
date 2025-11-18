import { authAPI } from './api.js';
import { Auth } from './config.js';
import { updateNavigation } from './main.js';

// Handler do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const messageDiv = document.getElementById('authMessage');
    messageDiv.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        const response = await authAPI.login(email, password);
        
        // Salvar token e dados do usuário
        Auth.setToken(response.token);
        Auth.setUser({
            id: response.userId,
            email: response.email,
            name: response.name,
            role: response.role
        });
        
        messageDiv.innerHTML = '<div class="message message-success">Login realizado com sucesso! Redirecionando...</div>';
        
        // Redirecionar
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect') || 'index.html';
            window.location.href = redirect;
        }, 1500);
    } catch (error) {
        messageDiv.innerHTML = `<div class="message message-error">${error.message || 'Erro ao fazer login. Verifique suas credenciais.'}</div>`;
    }
});

// Verificar se já está logado
if (Auth.isAuthenticated()) {
    window.location.href = 'index.html';
}

