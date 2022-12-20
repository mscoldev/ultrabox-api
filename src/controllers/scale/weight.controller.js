const { response, request } = require('express');



const getWeight = async (req = request, res = response) => {
    try {
        const scale = { weight: 1679 }
        res.status(200).json({
            msg: 'Valor de peso actual en bascula',
            scale
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}



module.exports = {
    getWeight
}