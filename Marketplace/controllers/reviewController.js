const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
    try {
        const { title, content, rating, user, product } = req.body;
        const newReview = new Review({ title, content, rating, user, product });
        await newReview.save();
        res.status(201).json({ mensaje: 'Reseña creada exitosamente', reseña: newReview });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo crear la reseña: Error interno del servidor', error: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reseñas', error: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ mensaje: 'Reseña no encontrada' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reseña por ID', error: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ mensaje: 'Reseña no encontrada' });
        }
        res.status(200).json({ mensaje: 'Reseña actualizada exitosamente', reseña: updatedReview });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo actualizar la reseña: Error interno del servidor', error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ mensaje: 'Reseña no encontrada' });
        }
        res.status(200).json({ mensaje: 'Reseña eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo eliminar la reseña: Error interno del servidor', error: error.message });
    }
};
