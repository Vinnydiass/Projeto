const Usuario = require('../models/usuario');

async function resolveUserId(req, res, next) {
    try {
        const { userId } = req.params; 
        const usuario = await Usuario.findOne({ id: userId }); 

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        req.usuarioNome = usuario.nome; 
        next();
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao resolver ID do usuário", erro: error });
    }
}

module.exports = resolveUserId;
