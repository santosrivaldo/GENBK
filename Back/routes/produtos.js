const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem : 'usando GET dentro de produtos'
    });

});

router.post('/', (req, res, next) => {
     const produto = {
        nome : req.body.nome,
        preco : req.body.preco
     }
    
    res.status(200).send({
        mensagem : 'Insere produto',
        produtoCriado : produto
    });
});

//RETORNA O PRODUTO ESPECIFICO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto //pega o id do produto
   if (id === '1') {
    res.status(200).send({
        mensagem : 'Você encontrou o id especial',
        id : id 
   } )
} else {
    res.status(200).send({
        mensagem : 'Você passou o id',
        id :id
    })
}
})
module.exports = router;
