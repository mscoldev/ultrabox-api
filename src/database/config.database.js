const mongoose = require('mongoose');
const clc = require('cli-color');
const localDatabase = process.env.MONGODB_LOCAL_CNN;
const remoteDatabase = process.env.MONGODB_CNN;

const config = { serverSelectionTimeoutMS: 3000 }

const dbConnection = async () => {
    try {
        const connectionLocalActive = await mongoose.connect(localDatabase, config);
        console.log(clc.green(`Database Local Online OK!...>${localDatabase}`));
    } catch (error) {
        console.error(clc.red('No fue posible conectar a la base de datos local'))
        console.error(error.reason);
        try {
            const connectionRemoteActive = await mongoose.connect(remoteDatabase, config);
            console.log(clc.green('Database Remote Online OK!...>'));
        } catch (error) {
            console.error(error.reason);
        }
    }

}

module.exports = {
    dbConnection
}
