import { Auth, Cart } from './config.js';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    Cart.updateCartCount();
    loadFooter();
});

// Atualizar navegação baseado no estado de autenticação
function updateNavigation() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const btnLogout = document.getElementById('btnLogout');

    if (Auth.isAuthenticated()) {
        if (navAuth) navAuth.style.display = 'none';
        if (navUser) navUser.style.display = 'flex';
        
        if (btnLogout) {
            btnLogout.addEventListener('click', handleLogout);
        }
    } else {
        if (navAuth) navAuth.style.display = 'flex';
        if (navUser) navUser.style.display = 'none';
    }
}

// Logout
function handleLogout() {
    Auth.removeToken();
    window.location.href = 'index.html';
}

// Carregar footer
function loadFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Love For Cupcake</h3>
                    <p>Adoçando sua vida com muito amor e sabor!</p>
                </div>
                <div class="footer-section">
                    <h3>Contato</h3>
                    <p>📞 Telefone: (11) 99999-9999</p>
                    <p>📧 Email: contato@loveforcupcake.com.br</p>
                    <p>📍 Endereço: Rua dos Doces, 123 - São Paulo, SP</p>
                </div>
                <div class="footer-section">
                    <h3>Envie uma Mensagem</h3>
                    <form class="contact-form" id="contactForm">
                        <input type="text" name="name" placeholder="Seu nome" required>
                        <input type="email" name="email" placeholder="Seu e-mail" required>
                        <textarea name="message" placeholder="Sua mensagem" required></textarea>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Love For Cupcake. Todos os direitos reservados.</p>
            </div>
        </div>
    `;

    // Adicionar handler do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handler do formulário de contato
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const { contactAPI } = await import('./api.js');
        await contactAPI.send(contactData);
        
        showMessage('Mensagem enviada com sucesso!', 'success');
        e.target.reset();
    } catch (error) {
        showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
    }
}

// Mostrar mensagem
export function showMessage(text, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = text;
    
    document.body.insertBefore(messageEl, document.body.firstChild);
    
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}

// Exportar função de atualização de navegação
export { updateNavigation };

