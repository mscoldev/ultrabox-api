const mongoose = require('mongoose');



const dbConnection = async()=>{

    try {
        console.log("Intentando conectar");
     await mongoose.connect(process.env.MONGODB_CNN);

     console.log('Database Online OK!...>');

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database mongo')
    }

}

module.exports = {
    dbConnection
}
