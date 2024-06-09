const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        ano_lancamento: {
            type: Number,
            required: true
        },
        emissora: {
            type: String,
            required: true
        },
        capitulos: {
            type: Number,
            required: true
        },
        autor: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
                return ret;
            }
        }
    });

const Novela = mongoose.model('Novela', schema)

module.exports = Novela
