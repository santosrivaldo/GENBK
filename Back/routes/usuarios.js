const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool
const bcrypy = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT * FROM usuarios WHERE email = ?;`, [req.body.email],
            (error, results) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length > 0) {
                    res.status(401).send({ mensagem: 'Ussuário já cadastrado' })
                } else {
                    bcrypy.hash(req.body.senha, 10, (errBcrypy, hash) => {
                        if (errBcrypy) { return res.status(500).send({ error: errBcrypy }) }
                        conn.query(
                            `INSERT INTO login.usuarios (email, senha) VALUES (?,?);`,
                            [req.body.email, hash],
                            (error, results) => {
                                conn.release()
                                if (error) { return res.status(500).send({ error: error }) }
                                response = {
                                    mensagem: `Usuario criado com sucesso`,
                                    usuarioCriado: {
                                        id_usuario: results.insertId,
                                        email: req.body.email
                                    }
                                }
                                return res.status(201).send({ response })
                            })
                    }
                    )

                }

            })

    })
})




router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM usuarios WHERE email = ?;`
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release()
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            bcrypy.compare(req.body.senha, results[0].senha, (error, results) => {
                if (error) {
                    return res.status(401).send({ mensagem: ' Falha na autenticação' })
                }
                if (results) {
                    const token = jwt.sign({
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        })


                    return res.status(200).send({
                        mensagem: 'Autenticação com sucesso',
                        id_usuario: results.id_usuario,
                        email: results.email,
                        token: token
                    })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    }
    )
})


module.exports = router;