const Joi = require('joi');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const usuarioSchema = Joi.object({
    nome: Joi.string()
        .messages({ 'string.base': 'campo precisa ser uma texto' })
        .required()
        .messages({ 'any.required': 'campo obrigatório' }),
    email: Joi.string()
        .email()
        .messages({ 'string.email': 'e-mail inválido', 'string.base': 'campo precisa ser uma texto' })
        .required()
        .messages({ 'any.required': 'campo obrigatório' }),
    senha: Joi.string()
        .messages({ 'string.base': 'campo precisa ser uma texto' })
        .required()
        .messages({ 'any.required': 'campo obrigatório' }),
    genero: Joi.string()
        .valid('masculino', 'feminino', 'outro')
        .messages({ 'any.only': 'gênero inválido', 'string.base': 'campo precisa ser uma texto' })
        .required()
        .messages({ 'any.required': 'campo obrigatório' }),
    dataNascimento: Joi.date()
        .iso()
        .messages({ 'date.format': 'data de nascimento inválida', 'date.base': 'campo precisa ser uma data válida' })
        .required()
        .messages({ 'any.required': 'campo obrigatório' })
});

function usuarioValidador(req, res, next) {
    const { error } = usuarioSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(e => ({
            campo: e.path[0],
            erros: [e.message]
        }));
        return res.status(400).json({
            mensagem: "Falha na validação dos campos",
            erros: errors
        });
    }
    next();
}

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .messages({ 'string.email': 'e-mail inválido', 'string.base': 'campo precisa ser uma texto' })
        .required()
        .messages({ 'any.required': 'campo obrigatório' }),
    senha: Joi.string()
        .messages({ 'string.base': 'campo precisa ser uma texto' })
        .required()
        .messages({ 'any.required': 'campo obrigatório' })
});

function loginValidador(req, res, next) {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(e => ({
            campo: e.path[0],
            erros: [e.message]
        }));
        return res.status(400).json({
            mensagem: "Falha na validação dos campos",
            erros: errors
        });
    }
    next();
}

async function checarToken(req, res, next) {
    try {
        const authorizationHeader = req.get('Authorization');
        const separator = authorizationHeader.split(' ');
        const token = separator[1];

        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "token inválido" });
    }
}

module.exports = {
    usuarioValidador,
    loginValidador,
    checarToken
};
