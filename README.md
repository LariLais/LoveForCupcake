# Love For Cupcake - Backend API

Backend API desenvolvido em Java com Spring Boot para o sistema de loja online de cupcakes.

## Tecnologias

- Java 17
- Spring Boot 3.2.0
- Spring Security (JWT)
- Spring Data JPA
- H2 Database (desenvolvimento)
- MySQL (produção)
- Maven

## Estrutura do Projeto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/loveforcupcake/
│   │   │   ├── controller/     # Controllers REST
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── model/          # Entidades JPA
│   │   │   ├── repository/     # Repositories JPA
│   │   │   ├── security/       # Configuração de segurança
│   │   │   ├── service/        # Lógica de negócio
│   │   │   └── util/           # Utilitários
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login (retorna token JWT)

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products?id={id}` - Buscar produto por ID

### Pedidos
- `POST /api/orders` - Criar novo pedido (requer autenticação)
- `GET /api/orders?userId={userId}` - Listar pedidos de um usuário (requer autenticação)

### Contato
- `POST /api/contact` - Enviar mensagem de contato

### Admin - Produtos
- `POST /api/admin/products` - Criar produto (requer role ADMIN)
- `PUT /api/admin/products?id={id}` - Atualizar produto (requer role ADMIN)
- `DELETE /api/admin/products?id={id}` - Remover produto (requer role ADMIN)

### Admin - Pedidos
- `PUT /api/admin/orders/status?id={id}` - Atualizar status do pedido (requer role ADMIN)

## Como Executar

### Pré-requisitos
- Java 17 ou superior
- Maven 3.6+

### Executar a aplicação

```bash
# Na pasta backend
mvn spring-boot:run
```

A aplicação estará disponível em `http://localhost:8080`

### Console H2 (desenvolvimento)
Acesse `http://localhost:8080/h2-console` para visualizar o banco de dados H2.

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após fazer login, inclua o token no header:

```
Authorization: Bearer {token}
```

## Exemplos de Uso

### Registrar usuário
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Listar produtos
```bash
curl http://localhost:8080/api/products
```

### Criar pedido
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 2
      }
    ],
    "shippingAddress": "123 Main St, City, State"
  }'
```

## Status dos Pedidos

- `PENDING` - Pendente
- `CONFIRMED` - Confirmado
- `PREPARING` - Em preparação
- `READY` - Pronto
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

## Configuração

As configurações podem ser alteradas no arquivo `application.properties`:

- Porta do servidor: `server.port`
- Banco de dados: `spring.datasource.*`
- JWT secret: `jwt.secret`
- JWT expiration: `jwt.expiration`

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

