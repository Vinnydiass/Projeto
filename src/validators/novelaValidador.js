const Joi = require('joi');
const Novela = require('../models/novela');

const schema = Joi.object({
    titulo: Joi.string().required().messages({
        'any.required': 'Campo título é obrigatório',
        'string.base': 'Campo título precisa ser um texto'
    }),
    ano_lancamento: Joi.number().integer().positive().required().messages({
        'any.required': 'Ano de lançamento é obrigatório',
        'number.base': 'Ano de lançamento precisa ser um número',
        'number.integer': 'Ano de lançamento precisa ser um número inteiro',
        'number.positive': 'Ano de lançamento precisa ser um número positivo'
    }),
    emissora: Joi.string().messages({
        'string.base': 'Campo emissora precisa ser um texto'
    }),
    capitulos: Joi.number().integer().positive().required().messages({
        'any.required': 'Número de capítulos é obrigatório',
        'number.base': 'Capítulos precisa ser um número',
        'number.integer': 'Capítulos precisa ser um número inteiro',
        'number.positive': 'Capítulos precisa ser um número positivo'
    }),
    autor: Joi.string().messages({
        'string.base': 'Campo autor precisa ser um texto'
    })
});

function novelaValidador(req, res, next) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (!error) {
        next();
    } else {
        const errors = error.details.map(e => {
            return {
                campo: e.path[0],
                erros: [e.message.replace(/"/g, '')]
            };
        });
        res.status(400).json({
            mensagem: 'Falha na validação dos campos',
            erros: errors
        });
    }
}

module.exports = {
    novelaValidador
};
