const Usuario = require('../models/usuario');

async function resolveUserId(req, res, next) {
    try {
        const { userId } = req.params; // Assume que o ID do usuário está nos parâmetros da URL
        const usuario = await Usuario.findOne({ id: userId }); // Buscar usuário pelo ID gerado

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        req.usuarioNome = usuario.nome; // Adiciona o nome do usuário ao objeto da requisição
        next();
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao resolver ID do usuário", erro: error });
    }
}

module.exports = resolveUserId;
