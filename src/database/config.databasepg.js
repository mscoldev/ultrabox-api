const { Sequelize } = require('sequelize');

const database = process.env.PG_DATABASE_NAME;
const username = process.env.PG_USERNAME;
const password = process.env.PG_DATABASE_PASSWORD;
const host = process.env.PG_HOST;



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: host,
        dialect: 'postgres'
    });

const pgConnection = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Conectado a la base de datos postgres');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, pgConnection };