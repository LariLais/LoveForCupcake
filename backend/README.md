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

