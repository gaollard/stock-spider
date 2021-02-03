const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stock', 'root', '123456', {
  host: '47.112.180.188',
  dialect: 'mysql',
  port: 33061
});

module.exports.sequelize = sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();