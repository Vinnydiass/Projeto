const Serie = require('../models/serie');


async function create(req, res) {
    try {
        const serie = new Serie(req.body);
        const serieCriada = await serie.save();
        res.status(201).json({
            mensagem: "Série criada com sucesso",
            serie: serieCriada
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar série", erro: error });
    }
}
async function getAll(req, res) {
    try {
        const series = await Serie.find();
        res.json(series);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar séries", erro: error });
    }
}

async function getById(req, res) {
    try {
        const serie = await Serie.findById(req.params.id);
        if (serie) {
            res.json(serie);
        } else {
            res.status(404).json({ mensagem: "Série não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar série", erro: error });
    }
}

async function update(req, res) {
    try {
        const serieAtualizada = await Serie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (serieAtualizada) {
            res.json({
                mensagem: "Série atualizada com sucesso!",
                serie: serieAtualizada
            });
        } else {
            res.status(404).json({ mensagem: "Série não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar série", erro: error });
    }
}


async function remove(req, res) {
    try {
        const serieExcluida = await Serie.findByIdAndDelete(req.params.id);
        if (serieExcluida) {
            res.json({
                mensagem: "Série excluída com sucesso!",
                serieExcluida
            });
        } else {
            res.status(404).json({ mensagem: "Série não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir série", erro: error });
    }
}

async function removeAll(req, res) {
    try {
        const resultado = await Serie.deleteMany({});
        res.status(200).json({
            mensagem: "Todas as séries foram removidas com sucesso",
            totalRemovidas: resultado.deletedCount
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao remover todas as séries", erro: error });
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
