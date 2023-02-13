const jsonata = require('jsonata');

async function nataFunction(data, ex, result) {
    try {
        const expression = jsonata(ex);
        const result = await expression.evaluate(data)
        console.log(`Los datos son: ${data}`);
        console.log(`El resultado es ${result}`);
        return result
    } catch (error) {
        console.log(error.message);
        throw new Error
    }

}


module.exports = nataFunction