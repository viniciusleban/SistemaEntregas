const TipoEntrega = require('../models/TipoEntrega');

const criar = async (req, res) => {
  try {
    const { nome, prazo_dias, valor } = req.body;

    if (!nome || !prazo_dias || !valor) {
      return res.status(400).json({ erro: 'Os campos nome, prazo_dias e valor são obrigatórios.' });
    }

    const tipo = await TipoEntrega.create({ nome, prazo_dias, valor });
    return res.status(201).json(tipo);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao criar tipo de entrega.', detalhe: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const tipos = await TipoEntrega.findAll();
    return res.status(200).json(tipos);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar tipos de entrega.', detalhe: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const tipo = await TipoEntrega.findByPk(req.params.id);

    if (!tipo) {
      return res.status(404).json({ erro: 'Tipo de entrega não encontrado.' });
    }

    return res.status(200).json(tipo);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar tipo de entrega.', detalhe: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const tipo = await TipoEntrega.findByPk(req.params.id);

    if (!tipo) {
      return res.status(404).json({ erro: 'Tipo de entrega não encontrado.' });
    }

    const { nome, prazo_dias, valor } = req.body;
    await tipo.update({ nome, prazo_dias, valor });

    return res.status(200).json(tipo);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar tipo de entrega.', detalhe: error.message });
  }
};

const deletar = async (req, res) => {
  try {
    const tipo = await TipoEntrega.findByPk(req.params.id);

    if (!tipo) {
      return res.status(404).json({ erro: 'Tipo de entrega não encontrado.' });
    }

    await tipo.destroy();
    return res.status(200).json({ mensagem: 'Tipo de entrega deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao deletar tipo de entrega.', detalhe: error.message });
  }
};

module.exports = { criar, listar, buscarPorId, atualizar, deletar };
