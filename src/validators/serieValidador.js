const Joi = require('joi');
const Serie = require('../models/serie');

const schema = Joi.object({
    titulo: Joi.string().required().messages({
        'any.required': 'Campo título é obrigatório',
        'string.base': 'Campo título precisa ser um texto'
    }),
    criador: Joi.string().messages({
        'string.base': 'Campo criador precisa ser um texto'
    }),
    ano_lancamento: Joi.number().integer().positive().required().messages({
        'any.required': 'Ano de lançamento é obrigatório',
        'number.base': 'Ano de lançamento precisa ser um número',
        'number.integer': 'Ano de lançamento precisa ser um número inteiro',
        'number.positive': 'Ano de lançamento precisa ser um número positivo'
    }),
    temporadas: Joi.number().integer().positive().required().messages({
        'any.required': 'Número de temporadas é obrigatório',
        'number.base': 'Temporadas precisa ser um número',
        'number.integer': 'Temporadas precisa ser um número inteiro',
        'number.positive': 'Temporadas precisa ser um número positivo'
    }),
    genero: Joi.string().messages({
        'string.base': 'Gênero precisa ser um texto'
    })
});

function serieValidador(req, res, next) {
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
    serieValidador
};
