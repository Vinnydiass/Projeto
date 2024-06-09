const Joi = require('joi');
const Filme = require('../models/filme');

const schema = Joi.object({
    titulo: Joi.string().required().messages({
        'any.required': 'Campo título é obrigatório',
        'string.base': 'Campo título precisa ser um texto'
    }),
    diretor: Joi.string().messages({
        'string.base': 'Campo diretor precisa ser um texto'
    }),
    genero: Joi.string().messages({
        'string.base': 'Gênero precisa ser um texto'
    }),
    ano_lancamento: Joi.number().integer().positive().required().messages({
        'any.required': 'Ano de lançamento é obrigatório',
        'number.base': 'Ano de lançamento precisa ser um número',
        'number.integer': 'Ano de lançamento precisa ser um número inteiro',
        'number.positive': 'Ano de lançamento precisa ser um número positivo'
    }),
    produtor: Joi.string().messages({
        'string.base': 'Campo produtor precisa ser um texto'
    })
});

function filmeValidador(req, res, next) {
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
    filmeValidador
};
