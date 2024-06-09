const Joi = require('joi');
const mongoose = require('mongoose');

const schema = Joi.object({
    nota: Joi.number().min(0.5).max(5).required().messages({
        'any.required': 'Campo nota é obrigatório',
        'number.base': 'Campo nota precisa ser um número',
        'number.min': 'Campo nota deve ser no mínimo 0.5',
        'number.max': 'Campo nota deve ser no máximo 5'
    }),
    review: Joi.string().required().messages({
        'any.required': 'Campo review é obrigatório',
        'string.base': 'Campo review precisa ser um texto'
    }),
    usuario: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Campo usuario precisa ser um ObjectId válido');
        }
        return value;
    }).messages({
        'any.required': 'Campo usuario é obrigatório'
    }),
    serie: Joi.string().custom((value, helpers) => {
        if (value && !mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Campo serie precisa ser um ObjectId válido');
        }
        return value;
    }).optional().messages({
        'string.base': 'Campo serie precisa ser um texto'
    }),
    filme: Joi.string().custom((value, helpers) => {
        if (value && !mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Campo filme precisa ser um ObjectId válido');
        }
        return value;
    }).optional().messages({
        'string.base': 'Campo filme precisa ser um texto'
    }),
    novela: Joi.string().custom((value, helpers) => {
        if (value && !mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Campo novela precisa ser um ObjectId válido');
        }
        return value;
    }).optional().messages({
        'string.base': 'Campo novela precisa ser um texto'
    })
});

function avaliacaoValidador(req, res, next) {
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
    avaliacaoValidador
};
