const mongoose = require('mongoose');

const schema = new mongoose.Schema(
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
        criador: {
            type: String,
            required: true
        },
        temporadas: {
            type: Number,
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

const Serie = mongoose.model('Serie', schema);

module.exports = Serie;
