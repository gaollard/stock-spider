const { sequelize } = require('../config/db');

const { DataTypes } = require('sequelize');

module.exports = sequelize.define('t_fund', {
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  day_grow: {
    type: DataTypes.FLOAT,
  },
  week_grow: {
    type: DataTypes.FLOAT,
  },
  month_grow: {
    type: DataTypes.FLOAT,
  },
  three_month_grow: {
    type: DataTypes.FLOAT,
  },
  six_month_grow: {
    type: DataTypes.FLOAT,
  },
  year_grow: {
    type: DataTypes.FLOAT,
  },
  two_year_grow: {
    type: DataTypes.FLOAT,
  },
}, {
  timestamps: false,
  freezeTableName: true
});

