const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    try {
   const decode = jwt.verify(req.body.token, process.env.JEW_KEY)
   req.usuario = decode
   next()
    } catch {
        return res.status(401).send({ mensagem: "Falha na verificação" })
    }
}