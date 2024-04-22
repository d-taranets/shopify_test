const { Sequelize } = require('sequelize');
const process = require("process");
const env = process.env.NODE_ENV || 'development';
const {dialect, host, port, database, username, password} = require('./config')[env];
const sequelize = new Sequelize(database, username, password, { host, port, dialect });

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((reason) => {
  console.error('Unable to connect to the database:', reason);
});