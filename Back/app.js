const express = require('express');
const app = express();
const  morgan = require('morgan')
const bodyParser = require('body-parser')






const rotaProdutos = require('./routes/produtos')
const rotaUsuarios = require('./routes/usuarios')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());/*
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requrested-With, Content-Type, Accept, Authezation'
    )
}) */


app.use('/produtos', rotaProdutos);
app.use('/usuarios', rotaUsuarios)

app.use((req, res, next)=> {
    const erro = new Error('Não encontrado');
    erro.status(404);
    next(erro);
})

app.use((error, req, res, next)=> {
    res.status(error.status || 500);
    return res.send({
        mensagem : error.mensagem
    })
}
)

module.exports = app;

