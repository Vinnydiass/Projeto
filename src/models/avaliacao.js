const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nota: {
            type: Number,
            required: true,
            min: 0.5,
            max: 5
        },
        review: {
            type: String,
            required: true
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario', 
            required: false
        },
        serie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Serie', 
            required: false
        },
        filme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Filme', 
            required: false
        },
        novela: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Novela', 
            required: false
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
const Avaliacao = mongoose.model('Avaliacao', schema) 

module.exports = Avaliacao
