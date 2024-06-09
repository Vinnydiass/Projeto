const mongoose = require('mongoose');

const filmeSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        genero: {
            type: String,
            required: true
        },
        ano_lancamento: {
            type: Number,
            required: true
        },
        diretor: {
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
const Filme = mongoose.model('Filme', filmeSchema);

module.exports = Filme;
