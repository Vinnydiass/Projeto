const Novela = require('../models/novela');


async function create(req, res) {
    try {
        const novela = new Novela(req.body);
        const novelaCriada = await novela.save();
        res.status(201).json({
            mensagem: "Novela criada com sucesso",
            novela: novelaCriada
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar novela", erro: error });
    }
}

async function getAll(req, res) {
    try {
        const novelas = await Novela.find();
        res.json(novelas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar novelas", erro: error });
    }
}

async function getById(req, res) {
    try {
        const novela = await Novela.findById(req.params.id);
        if (novela) {
            res.json(novela);
        } else {
            res.status(404).json({ mensagem: "Novela não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar novela", erro: error });
    }
}

async function update(req, res) {
    try {
        const novelaAtualizada = await Novela.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (novelaAtualizada) {
            res.json({
                mensagem: "Novela atualizada com sucesso!",
                novela: novelaAtualizada
            });
        } else {
            res.status(404).json({ mensagem: "Novela não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar novela", erro: error });
    }
}


async function remove(req, res) {
    try {
        const novelaExcluida = await Novela.findByIdAndDelete(req.params.id);
        if (novelaExcluida) {
            res.json({
                mensagem: "Novela excluída com sucesso!",
                novelaExcluida
            });
        } else {
            res.status(404).json({ mensagem: "Novela não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir novela", erro: error });
    }
}

async function removeAll(req, res) {
    try {
        const resultado = await Novela.deleteMany({});
        res.status(200).json({
            mensagem: "Todas as novelas foram removidas com sucesso",
            totalRemovidos: resultado.deletedCount
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao remover todas as novelas", erro: error });
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
