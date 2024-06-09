const Filme = require('../models/filme');


async function create(req, res) {
    try {
        const filme = new Filme(req.body);
        const filmeCriado = await filme.save();
        res.status(201).json({
            mensagem: "Filme criado com sucesso",
            filme: filmeCriado
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar filme", erro: error });
    }
}

async function getAll(req, res) {
    try {
        const filmes = await Filme.find();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar filmes", erro: error });
    }
}

async function getById(req, res) {
    try {
        const filme = await Filme.findById(req.params.id);
        if (filme) {
            res.json(filme);
        } else {
            res.status(404).json({ mensagem: "Filme não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar filme", erro: error });
    }
}

async function update(req, res) {
    try {
        const filmeAtualizado = await Filme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (filmeAtualizado) {
            res.json({
                mensagem: "Filme atualizado com sucesso!",
                filme: filmeAtualizado
            });
        } else {
            res.status(404).json({ mensagem: "Filme não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar filme", erro: error });
    }
}


async function remove(req, res) {
    try {
        const filmeExcluido = await Filme.findByIdAndDelete(req.params.id);
        if (filmeExcluido) {
            res.json({
                mensagem: "Filme excluído com sucesso!",
                filmeExcluido
            });
        } else {
            res.status(404).json({ mensagem: "Filme não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir filme", erro: error });
    }
}

async function removeAll(req, res) {
    try {
        const resultado = await Filme.deleteMany({});
        res.status(200).json({
            mensagem: "Todos os filmes foram removidos com sucesso",
            totalRemovidos: resultado.deletedCount
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao remover todos os filmes", erro: error });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    removeAll
};
