const express = require('express');
const sequelize = require('./banco');
const cors = require('cors');

require('./models/TipoEntrega');
require('./models/Entrega');

const tipoEntregaController = require('./controllers/tipoEntregaController');
const entregaController = require('./controllers/entregaController');

const app = express();
app.use(express.json());
app.use(cors());

// ========================
// ROTAS - Tipos de Entrega
// ========================
app.post('/tipos-entrega', tipoEntregaController.criar);
app.get('/tipos-entrega', tipoEntregaController.listar);
app.get('/tipos-entrega/:id', tipoEntregaController.buscarPorId);
app.put('/tipos-entrega/:id', tipoEntregaController.atualizar);
app.delete('/tipos-entrega/:id', tipoEntregaController.deletar);

// ========================
// ROTAS - Entregas
// ========================
app.post('/entregas', entregaController.criar);
app.get('/entregas', entregaController.listar);
app.get('/entregas/:id', entregaController.buscarPorId);
app.put('/entregas/:id', entregaController.atualizar);
app.delete('/entregas/:id', entregaController.deletar);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API Sistema de Entregas funcionando!' });
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
