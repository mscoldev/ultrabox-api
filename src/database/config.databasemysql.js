require('dotenv').config();


const { Sequelize } = require('sequelize');

const database = process.env.MYSQL_DATABASE_NAME;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_DATABASE_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    database,
    username,
    password, {
        host: host,
        dialect: 'postgres',
        port: port
    });

const pgConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos postgres');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, pgConnection };
