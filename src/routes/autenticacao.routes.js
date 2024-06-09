const express = require('express')
const router = express.Router()

const AutenticacaoController = require('../controllers/autenticacaoControllers')

const { usuarioValidador, loginValidador } = require('../validators/autenticacaoValidador')


router.post('/auth/registro', usuarioValidador, AutenticacaoController.registrar)

router.post('/auth/login', loginValidador, AutenticacaoController.login)


module.exports = router