const { response, request } = require('express');



const authGet = (req = request, res = response) => {

    res.json({
        msg:"Auth Get"
    })

}

const authPut = (req = request, res = response) => {

}

const authPost = (req = request, res = response) => {

}


module.exports = {
    authGet,
    authPut,
    authPost
}
