const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const usuarioSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4, // Gerar ID único automaticamente
            unique: true,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        senha: {
            type: String,
            required: true
        },
        genero: {
            type: String,
            required: true
        },
        dataNascimento: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function(doc, ret) {
                delete ret.__v;
                delete ret.senha;
                delete ret.createdAt;
                delete ret.updatedAt;
                return ret;
            }
        }
    }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
