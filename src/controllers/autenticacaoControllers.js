require('dotenv').config();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

console.log('JWT_SECRET:', JWT_SECRET);

async function registrar(req, res) {
    const { nome, email, senha, genero, dataNascimento } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
        return res.status(400).json({ mensagem: "Usuário já existe!" });
    }

    const hash = await bcrypt.hash(senha, 10);

    const usuario = new Usuario({
        nome,
        email,
        senha: hash,
        genero,
        dataNascimento
    });

    await usuario.save();

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", usuarioId: usuario._id });
}

async function login(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(401).json({ mensagem: "Usuário não cadastrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidos!" });
    }

    const token = jwt.sign({ email: usuario.email }, JWT_SECRET, { expiresIn: '10h' });

    res.json(
        {
            mensagem: "Login efetuado com sucesso!",
            token
        }
    );
}

async function getAll(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuários", erro: error });
    }
}

async function getById(req, res) {
    try {
        const usuario = await Usuario.findOne({ id: req.params.id });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuário", erro: error });
    }
}

async function update(req, res) {
    try {
        const { senha, ...updateData } = req.body;
        if (senha) {
            updateData.senha = await bcrypt.hash(senha, 10);
        }
        const usuarioAtualizado = await Usuario.findOneAndUpdate({ id: req.params.id }, updateData, { new: true });
        if (usuarioAtualizado) {
            res.json({
                mensagem: "Usuário atualizado com sucesso",
                usuario: usuarioAtualizado
            });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar usuário", erro: error });
    }
}

async function remove(req, res) {
    try {
        const usuarioExcluido = await Usuario.findOneAndDelete({ id: req.params.id });
        if (usuarioExcluido) {
            res.json({
                mensagem: "Usuário excluído com sucesso",
                usuarioExcluido
            });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir usuário", erro: error });
    }
}

async function removeAll(req, res) {
    try {
        const resultado = await Usuario.deleteMany({});
        res.status(200).json({
            mensagem: "Todos os usuários foram removidos com sucesso",
            totalRemovidos: resultado.deletedCount
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao remover todos os usuários", erro: error });
    }
}

module.exports = {
    registrar,
    login,
    getAll,
    getById,
    update,
    remove,
    removeAll
};
