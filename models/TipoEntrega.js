const { DataTypes } = require('sequelize');
const sequelize = require('../banco');

const TipoEntrega = sequelize.define('TipoEntrega', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, //"Normal", "Expressa"
  },
  prazo_dias: {
    type: DataTypes.INTEGER,
    allowNull: false, //prazo em dias para entrega
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, //valor cobrado pelo tipo de entrega
  },
}, {
  tableName: 'tipos_entrega',
  timestamps: true,
});

module.exports = TipoEntrega;
