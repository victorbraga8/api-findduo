const {Sequelize} = require ('sequelize');

const sequelize = new Sequelize('u766130877_gestao', 'u766130877_gestao', 'Niteroi11',{
  host:'185.212.70.52',
  dialect: 'mysql'
});

sequelize.authenticate().then(function(errors) { console.log(errors) });