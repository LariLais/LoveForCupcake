# Love For Cupcake - Frontend

Frontend da loja online de cupcakes desenvolvido com HTML, CSS e JavaScript vanilla.

## Estrutura do Projeto

```
frontend/
├── index.html          # Página inicial
├── cardapio.html       # Página de cardápio
├── comprar.html        # Página de compras
├── carrinho.html       # Carrinho de compras
├── pagamento.html      # Checkout/Pagamento
├── login.html          # Login
├── cadastro.html       # Cadastro de usuário
├── meus-pedidos.html   # Área do cliente
├── css/
│   ├── style.css       # Estilos globais
│   ├── home.css        # Estilos da home
│   ├── cardapio.css    # Estilos do cardápio
│   ├── comprar.css     # Estilos da página de compras
│   ├── carrinho.css    # Estilos do carrinho
│   ├── pagamento.css   # Estilos do pagamento
│   ├── auth.css        # Estilos de autenticação
│   └── pedidos.css     # Estilos dos pedidos
└── js/
    ├── config.js       # Configurações e utilitários
    ├── api.js          # Serviços de API
    ├── main.js         # Script principal
    ├── home.js         # Script da home
    ├── cardapio.js     # Script do cardápio
    ├── comprar.js      # Script de compras
    ├── carrinho.js     # Script do carrinho
    ├── pagamento.js    # Script do pagamento
    ├── login.js        # Script de login
    ├── cadastro.js     # Script de cadastro
    └── pedidos.js      # Script de pedidos
```

## Funcionalidades

### ✅ Páginas Implementadas

1. **Home** - Apresentação da loja, história e valores
2. **Cardápio** - Listagem completa de produtos
3. **Comprar** - Página de compras com adição ao carrinho
4. **Carrinho** - Gerenciamento de itens no carrinho
5. **Pagamento** - Checkout e finalização de pedido
6. **Login** - Autenticação de usuários
7. **Cadastro** - Registro de novos usuários
8. **Meus Pedidos** - Área do cliente com histórico de pedidos

### ✅ Funcionalidades Principais

- ✅ Autenticação JWT
- ✅ Gerenciamento de carrinho (localStorage)
- ✅ Integração com API backend
- ✅ Design responsivo
- ✅ Formulário de contato no rodapé
- ✅ Validação de formulários
- ✅ Mensagens de feedback

## Como Usar

### Pré-requisitos

- Backend Java rodando em `http://localhost:8080`
- Navegador moderno com suporte a ES6 modules

### Executar

1. Abra o arquivo `index.html` em um navegador
2. Ou use um servidor HTTP local:

```bash
# Com Python
python -m http.server 8000

# Com Node.js (http-server)
npx http-server -p 8000

# Com PHP
php -S localhost:8000
```

3. Acesse `http://localhost:8000`

## Configuração da API

A URL da API pode ser configurada em `js/config.js`:

```javascript
export const API_BASE_URL = 'http://localhost:8080/api';
```

## Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

- Token salvo em `localStorage`
- Token enviado no header `Authorization: Bearer {token}`
- Token válido por 24 horas (configurável no backend)

## Carrinho de Compras

O carrinho é gerenciado via `localStorage`:

- Persiste entre sessões
- Limpo após finalizar pedido
- Sincronizado em todas as páginas

## Estrutura de Dados

### Usuário (localStorage)
```javascript
{
  id: 1,
  email: "user@example.com",
  name: "Nome do Usuário",
  role: "USER"
}
```

### Carrinho (localStorage)
```javascript
[
  {
    productId: 1,
    name: "Cupcake de Chocolate",
    price: 15.90,
    quantity: 2,
    imageUrl: "..."
  }
]
```

## Responsividade

O design é totalmente responsivo e funciona em:
- 📱 Celulares (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## Navegadores Suportados

- Chrome (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Edge (últimas versões)

## Notas

- O frontend usa módulos ES6, então precisa ser servido via HTTP (não funciona com `file://`)
- Imagens de produtos usam placeholder se não houver URL
- O sistema está preparado para integração com backend Java

