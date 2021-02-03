
module.exports = app => {
  const { STRING, FLOAT } = app.Sequelize;
  const Fund = app.model.define('t_fund', {
    code: {
      type: STRING,
      allowNull: false
    },
    title: {
      type: STRING,
      allowNull: false
    },
    date: {
      type: STRING,
      allowNull: false
    },
    day_grow: {
      type: FLOAT,
    },
    week_grow: {
      type: FLOAT,
    },
    month_grow: {
      type: FLOAT,
    },
    three_month_grow: {
      type: FLOAT,
    },
    six_month_grow: {
      type: FLOAT,
    },
    year_grow: {
      type: FLOAT,
    },
    two_year_grow: {
      type: FLOAT,
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
  return Fund;
}

