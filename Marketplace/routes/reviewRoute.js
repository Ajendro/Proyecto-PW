const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/reviewscreate', reviewController.createReview);
router.post('/reviews', reviewController.getReviews);
router.post('/review/:id', reviewController.getReviewById);
router.put('/updatereviews/:id', reviewController.updateReview);
router.delete('/deletereviews/:id', reviewController.deleteReview);

module.exports = router;
