const Entrega = require('../models/Entrega');
const TipoEntrega = require('../models/TipoEntrega');

const calcularDataPrevista = (dataPostagem, prazoDias) => {
  const data = new Date(dataPostagem + 'T00:00:00');
  data.setDate(data.getDate() + prazoDias);
  return data.toISOString().split('T')[0];
};

const criar = async (req, res) => {
  try {
    const { destinatario, endereco, data_postagem, tipo_entrega_id, data_entrega } = req.body;

    if (!destinatario || !endereco || !data_postagem || !tipo_entrega_id) {
      return res.status(400).json({ erro: 'Os campos destinatario, endereco, data_postagem e tipo_entrega_id são obrigatórios.' });
    }

    const tipo = await TipoEntrega.findByPk(tipo_entrega_id);
    if (!tipo) {
      return res.status(404).json({ erro: 'Tipo de entrega não encontrado.' });
    }

    const data_prevista = calcularDataPrevista(data_postagem, tipo.prazo_dias);

    const entrega = await Entrega.create({
      destinatario,
      endereco,
      data_postagem,
      data_prevista,
      data_entrega: data_entrega || null,
      tipo_entrega_id,
    });

    return res.status(201).json(entrega);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao criar entrega.', detalhe: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const entregas = await Entrega.findAll({
      include: [{ model: TipoEntrega, as: 'tipo' }],
    });
    return res.status(200).json(entregas);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar entregas.', detalhe: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const entrega = await Entrega.findByPk(req.params.id, {
      include: [{ model: TipoEntrega, as: 'tipo' }],
    });

    if (!entrega) {
      return res.status(404).json({ erro: 'Entrega não encontrada.' });
    }

    return res.status(200).json(entrega);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar entrega.', detalhe: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const entrega = await Entrega.findByPk(req.params.id);

    if (!entrega) {
      return res.status(404).json({ erro: 'Entrega não encontrada.' });
    }

    const { destinatario, endereco, data_postagem, tipo_entrega_id, data_entrega } = req.body;

    let data_prevista = entrega.data_prevista;

    const novoTipoId = tipo_entrega_id || entrega.tipo_entrega_id;
    const novaDataPostagem = data_postagem || entrega.data_postagem;

    if (data_postagem || tipo_entrega_id) {
      const tipo = await TipoEntrega.findByPk(novoTipoId);
      if (!tipo) {
        return res.status(404).json({ erro: 'Tipo de entrega não encontrado.' });
      }
      data_prevista = calcularDataPrevista(novaDataPostagem, tipo.prazo_dias);
    }

    await entrega.update({
      destinatario: destinatario || entrega.destinatario,
      endereco: endereco || entrega.endereco,
      data_postagem: novaDataPostagem,
      data_prevista,
      data_entrega: data_entrega !== undefined ? data_entrega : entrega.data_entrega,
      tipo_entrega_id: novoTipoId,
    });

    return res.status(200).json(entrega);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar entrega.', detalhe: error.message });
  }
};


const deletar = async (req, res) => {
  try {
    const entrega = await Entrega.findByPk(req.params.id);

    if (!entrega) {
      return res.status(404).json({ erro: 'Entrega não encontrada.' });
    }

    await entrega.destroy();
    return res.status(200).json({ mensagem: 'Entrega deletada com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao deletar entrega.', detalhe: error.message });
  }
};

module.exports = { criar, listar, buscarPorId, atualizar, deletar };
