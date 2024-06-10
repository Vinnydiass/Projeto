const Avaliacao = require('../models/avaliacao');
const Filme = require('../models/filme');
const Serie = require('../models/serie');
const Novela = require('../models/novela');

async function create(req, res) {
    try {
        const { nota, review, usuario, filme, serie, novela } = req.body;

        if (!nota || !review) {
            return res.status(400).json({ mensagem: 'Nota e review são obrigatórios.' });
        }

        if (filme) {
            const filmeExiste = await Filme.findById(filme);
            if (!filmeExiste) {
                return res.status(400).json({ mensagem: 'Filme não encontrado.' });
            }
        }

        if (serie) {
            const serieExiste = await Serie.findById(serie);
            if (!serieExiste) {
                return res.status(400).json({ mensagem: 'Série não encontrada.' });
            }
        }

        if (novela) {
            const novelaExiste = await Novela.findById(novela);
            if (!novelaExiste) {
                return res.status(400).json({ mensagem: 'Novela não encontrada.' });
            }
        }
        const novaAvaliacao = new Avaliacao({ nota, review, usuario, filme, serie, novela });

        const avaliacaoCriada = await novaAvaliacao.save();

        const avaliacaoPopulada = await Avaliacao.findById(avaliacaoCriada._id)
            .populate('usuario', 'nome')
            .populate('filme')
            .populate('serie')
            .populate('novela');

        res.status(201).json(avaliacaoPopulada);
    } catch (error) {
        console.error('Erro ao criar avaliação:', error);
        res.status(500).json({ mensagem: "Erro ao criar avaliação", erro: error.message });
    }
}

async function getAll(req, res) {
    try {
        const avaliacoes = await Avaliacao.find()
            .populate('usuario')
            .populate('filme')
            .populate('serie')
            .populate('novela');
        res.json(avaliacoes);
    } catch (error) {
        console.error('Erro ao buscar avaliações:', error); 
        res.status(500).json({ mensagem: "Erro ao buscar avaliações", erro: error.message });
    }
}

async function getById(req, res) {
    try {
        const avaliacao = await Avaliacao.findById(req.params.id)
            .populate('usuario')
            .populate('filme')
            .populate('serie')
            .populate('novela');
        if (avaliacao) {
            res.json(avaliacao);
        } else {
            res.status(404).json({ mensagem: "Avaliação não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar avaliação", erro: error });
    }
}

async function update(req, res) {
    try {
        const avaliacaoAtualizada = await Avaliacao.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('usuario')
            .populate('filme')
            .populate('serie')
            .populate('novela');
        if (avaliacaoAtualizada) {
            res.json({
                mensagem: "Avaliação atualizada com sucesso!",
                avaliacao: avaliacaoAtualizada
            });
        } else {
            res.status(404).json({ mensagem: "Avaliação não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar avaliação", erro: error });
    }
}


async function remove(req, res) {
    try {
        const avaliacaoExcluida = await Avaliacao.findByIdAndDelete(req.params.id);
        if (avaliacaoExcluida) {
            res.json({
                mensagem: "Avaliação excluída com sucesso!",
                avaliacaoExcluida
            });
        } else {
            res.status(404).json({ mensagem: "Avaliação não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir avaliação", erro: error });
    }
}

async function removeAll(req, res) {
    try {
        const resultado = await Avaliacao.deleteMany({});
        res.status(200).json({
            mensagem: "Todas as avaliações foram removidas com sucesso",
            totalRemovidos: resultado.deletedCount
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao remover todas as avaliações", erro: error });
    }
}


async function getMediaNotasPorTitulo(req, res) {
    try {
        const { titulo } = req.params;

        const filme = await Filme.findOne({ titulo });
        if (!filme) {
            return res.status(404).json({ mensagem: "Filme não encontrado!" });
        }

        const avaliacoes = await Avaliacao.find({ filme: filme._id });
        if (avaliacoes.length === 0) {
            return res.status(404).json({ mensagem: "Nenhuma avaliação encontrada para este filme!" });
        }

        const somaNotas = avaliacoes.reduce((total, avaliacao) => total + avaliacao.nota, 0);
        const mediaNotas = (somaNotas / avaliacoes.length).toFixed(1); 

        res.status(200).json({ 
            mensagem: "Média das notas calculada com sucesso",
            titulo: filme.titulo,
            mediaNotas: parseFloat(mediaNotas) 
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao calcular média das notas", erro: error.message });
    }
}





async function getMediaNotasPorTituloSerie(req, res) {
    try {
        const { titulo } = req.params;

        const serie = await Serie.findOne({ titulo });
        if (!serie) {
            return res.status(404).json({ mensagem: "Série não encontrada!" });
        }

        const avaliacoes = await Avaliacao.find({ serie: serie._id });
        if (avaliacoes.length === 0) {
            return res.status(404).json({ mensagem: "Nenhuma avaliação encontrada para esta série!" });
        }

        const somaNotas = avaliacoes.reduce((total, avaliacao) => total + avaliacao.nota, 0);
        const mediaNotas = (somaNotas / avaliacoes.length).toFixed(1); 

        res.status(200).json({ 
            mensagem: "Média das notas calculada com sucesso",
            titulo: serie.titulo,
            mediaNotas: parseFloat(mediaNotas) 
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao calcular média das notas", erro: error.message });
    }
}

async function getMediaNotasPorTituloNovela(req, res) {
    try {
        const { titulo } = req.params;

        const novela = await Novela.findOne({ titulo });
        if (!novela) {
            return res.status(404).json({ mensagem: "Novela não encontrada!" });
        }

        const avaliacoes = await Avaliacao.find({ novela: novela._id });
        if (avaliacoes.length === 0) {
            return res.status(404).json({ mensagem: "Nenhuma avaliação encontrada para esta novela!" });
        }

        const somaNotas = avaliacoes.reduce((total, avaliacao) => total + avaliacao.nota, 0);
        const mediaNotas = (somaNotas / avaliacoes.length).toFixed(1); 

        res.status(200).json({ 
            mensagem: "Média das notas calculada com sucesso",
            titulo: novela.titulo,
            mediaNotas: parseFloat(mediaNotas) 
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao calcular média das notas", erro: error.message });
    }
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    removeAll,
    getMediaNotasPorTitulo,
    getMediaNotasPorTituloSerie,
    getMediaNotasPorTituloNovela
};
