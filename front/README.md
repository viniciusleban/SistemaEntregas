# Sistema de Entregas — Front-end

Front-end React para o [SistemaEntregas](https://github.com/viniciusleban/SistemaEntregas), seguindo a mesma estrutura do projeto petshop de referência.

## Tecnologias

- **React 19** com componentes funcionais e Hooks
- **React Router DOM v7** para roteamento
- **Axios** para consumo da API REST
- **Bootstrap 5 + Bootstrap Icons** para layout e ícones
- **React Toastify** para notificações de sucesso/erro
- **CSS customizado** com paleta HSL (azul profissional + laranja)

## Estrutura

```
src/
├── components/
│   ├── ConfirmModal.js   # Modal de confirmação para exclusões
│   ├── Footer.js
│   ├── Navbar.js         # Topbar com título dinâmico
│   └── Sidebar.js        # Menu lateral responsivo
├── pages/
│   ├── LandingPage.js    # Página inicial com cards de acesso rápido
│   ├── tipoEntrega/
│   │   ├── TipoEntregaList.js
│   │   └── TipoEntregaForm.js
│   └── entrega/
│       ├── EntregaList.js
│       └── EntregaForm.js
├── services/
│   ├── tipoEntregaService.js
│   └── entregaService.js
├── App.css
├── App.js
└── index.js
```

## Como rodar

### 1. Iniciar o back-end

Certifique-se de que o back-end do SistemaEntregas está rodando em `http://localhost:3000`.

### 2. Instalar dependências do front

```bash
cd sistema-entregas-front
npm install
```

### 3. Iniciar o front

```bash
npm start
```

O navegador abrirá em `http://localhost:3001` (ou outra porta se 3000 estiver ocupada).

## Endpoints consumidos

| Recurso         | URL base              |
|-----------------|----------------------|
| Tipos de Entrega | `/tipos-entrega`     |
| Entregas         | `/entregas`          |

> A data prevista de entrega é calculada automaticamente pelo back-end com base na `dataPostagem` e no `prazoEmDias` do tipo de entrega.
