const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool






router.get('/', (req, res, next) => {
    //res.status(200).send({
    //  mensagem : 'usando GET dentro de produtos'
    // });

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM usuario;',
            (error, resultado, fields) => {
                if (error) { return res.status(200).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }

        )
    })




});

router.post('/', (req, res, next) => {
    const produto = {
        id: req.body.id,
        nome: req.body.nome,
        preco: req.body.preco
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO `login`.`usuario` (`id`, `nome`, `senha`) VALUES ( ? , ? , ?);',
            [req.body.id, req.body.nome, req.body.senha],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(200).send({
                    mensagem: 'Produto inserido',
                    produtoCriado: produto
                });
            }
        )
    })




});

//RETORNA O PRODUTO ESPECIFICO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto //pega o id do produto
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM usuario WHERE id = ?;',
            [id],
            (error, resultado, fields) => {
                if (error) { return res.status(200).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }

        )
    })
})


//router para patch

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send ({ error: error})}
        conn.query(
            `UPDATE usuario
               SET nome  = ?,
                senha    = ?
                WHERE id = ?;`, 
            [   
                req.body.nome,
                req.body.senha,
                req.body.id_usuario
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso',
                    
                })
            }

        )

    })
})




router.delete('/', ('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send ({ error: error})}
        conn.query(
            `DELETE FROM usuario WHERE id = 
            ?`, [req.body.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    mensagem: 'Produto Excluido com sucesso',
                    
                })

            }

    )})
    }))

module.exports = router;
