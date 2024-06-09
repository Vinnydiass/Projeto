// routes/routes.js

const express = require('express')
const router = express.Router()

// controllers
const SerieController = require('../controllers/serieControllers')
const FilmeController = require('../controllers/filmeControllers')
const NovelaController = require('../controllers/novelaControllers')
const AvaliacaoController = require('../controllers/avaliacaoControllers')
const AuthController = require('../controllers/autenticacaoControllers');


// validators
const { validarId } = require('../validators/idValidator')
const { serieValidador } = require('../validators/serieValidador')
const { filmeValidador } = require('../validators/filmeValidador')
const { novelaValidador } = require('../validators/novelaValidador')
const { avaliacaoValidador } = require('../validators/avaliacaoValidador')
const { checarToken } = require('../validators/autenticacaoValidador');
const { usuarioValidador } = require('../validators/autenticacaoValidador');



// Usuario
router.get('/usuarios', checarToken, AuthController.getAll);
router.get('/usuarios/:id', checarToken, AuthController.getById);
router.put('/usuarios/:id', checarToken, usuarioValidador, AuthController.update);
router.delete('/usuarios/:id', checarToken, AuthController.remove);
router.delete('/usuarios', checarToken, AuthController.removeAll);

// Avaliacao
router.post('/avaliacao', checarToken, avaliacaoValidador, AvaliacaoController.create);
router.get('/avaliacao', checarToken, AvaliacaoController.getAll);
router.get('/avaliacao/:id', checarToken, validarId, AvaliacaoController.getById);
router.put('/avaliacao/:id', checarToken, validarId, avaliacaoValidador, AvaliacaoController.update);
router.delete('/avaliacao/:id', checarToken, validarId, AvaliacaoController.remove);
router.delete('/avaliacao', checarToken, AvaliacaoController.removeAll);

//Medias FILME, NOVELA, SERIE 
router.get('/avaliacao/media/filme/:titulo', checarToken, AvaliacaoController.getMediaNotasPorTitulo);
router.get('/avaliacao/media/serie/:titulo', checarToken, AvaliacaoController.getMediaNotasPorTituloSerie);
router.get('/avaliacao/media/novela/:titulo', checarToken, AvaliacaoController.getMediaNotasPorTituloNovela);


// Novela
router.post('/novelas', checarToken, novelaValidador, NovelaController.create);
router.get('/novelas', checarToken, NovelaController.getAll);
router.get('/novelas/:id', checarToken, validarId, NovelaController.getById);
router.put('/novelas/:id', checarToken, validarId, novelaValidador, NovelaController.update);
router.delete('/novelas/:id', checarToken,validarId, NovelaController.remove);
router.delete('/novelas', checarToken, NovelaController.removeAll);

// Filme
router.post('/filmes', checarToken, filmeValidador, FilmeController.create);
router.get('/filmes', checarToken, FilmeController.getAll);
router.get('/filmes/:id', checarToken, validarId, FilmeController.getById);
router.put('/filmes/:id', checarToken, validarId, filmeValidador, FilmeController.update);
router.delete('/filmes/:id', checarToken, validarId, FilmeController.remove);
router.delete('/filmes', checarToken, FilmeController.removeAll);

// Serie
router.post('/series', checarToken, serieValidador, SerieController.create);
router.get('/series', checarToken, SerieController.getAll);
router.get('/series/:id', checarToken, validarId, SerieController.getById);
router.put('/series/:id', checarToken, validarId, serieValidador, SerieController.update);
router.delete('/series/:id', checarToken, validarId, SerieController.remove);
router.delete('/series', checarToken, SerieController.removeAll);

module.exports = router;
