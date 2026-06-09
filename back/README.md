# Sistema de Entregas

API REST para gerenciamento de entregas, desenvolvida com Node.js, Express, Sequelize e PostgreSQL.

## Rotas

### Tipos de Entrega

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /tipos-entrega | Cadastrar tipo de entrega |
| GET | /tipos-entrega | Listar tipos de entrega |
| GET | /tipos-entrega/:id | Buscar tipo por ID |
| PUT | /tipos-entrega/:id | Atualizar tipo de entrega |
| DELETE | /tipos-entrega/:id | Deletar tipo de entrega |

### Entregas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /entregas | Cadastrar entrega |
| GET | /entregas | Listar entregas |
| GET | /entregas/:id | Buscar entrega por ID |
| PUT | /entregas/:id | Atualizar entrega |
| DELETE | /entregas/:id | Deletar entrega |

> A data prevista de entrega é calculada automaticamente com base na data de postagem e no prazo do tipo de entrega escolhido.