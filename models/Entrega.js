const { DataTypes } = require('sequelize');
const sequelize = require('../banco');
const TipoEntrega = require('./TipoEntrega');

const Entrega = sequelize.define('Entrega', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  destinatario: {
    type: DataTypes.STRING,
    allowNull: false, //nome de quem vai receber
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false, //endereço de entrega
  },
  data_postagem: {
    type: DataTypes.DATEONLY,
    allowNull: false, //data em que a mercadoria foi postada
  },
  data_prevista: {
    type: DataTypes.DATEONLY,
    allowNull: true, //calculada automaticamente
  },
  data_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: true, //data real de entrega (pode ser preenchida depois)
  },
  tipo_entrega_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoEntrega,
      key: 'id',
    },
  },
}, {
  tableName: 'entregas',
  timestamps: true,
});

//Relacionamento: Entrega pertence a TipoEntrega
Entrega.belongsTo(TipoEntrega, { foreignKey: 'tipo_entrega_id', as: 'tipo' });
TipoEntrega.hasMany(Entrega, { foreignKey: 'tipo_entrega_id', as: 'entregas' });

module.exports = Entrega;
