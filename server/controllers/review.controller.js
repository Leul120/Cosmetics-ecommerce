const reviewModel = require('../models/review.model'); // Assuming reviewSchema is defined in review.model.js
// If you have a product model

// Add a new review for a product
exports.addReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id
    console.log(userId)// Assuming req.user has been populated via auth middleware

    try {
        // Find the product by productId
        
        const productReview = await reviewModel.findOne({ productId });

        if (productReview) {
            // If reviews exist for this product, push new review to the reviews array
            productReview.reviews.push({
                user: userId,
                rating,
                comment
            });

            await productReview.save();
        } else {
            // If no reviews exist for this product, create a new review entry
            const newReview = new reviewModel({
                productId,
                reviews: [{
                    user: req.user._id,
                    rating,
                    comment
                }]
            });

            await newReview.save();
        }

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
      console.log(error)
        res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
};

// Get all reviews for a specific product
exports.getReviewsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
      
        const reviews = await reviewModel.findOne({ productId })
            .populate('reviews.user', 'name'); // Assuming 'name' is a field in the User model

        // if (!reviews) {
        //     return res.status(404).json({ message: 'No reviews found for this product' });
        // }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id

    try {
        const productReview = await reviewModel.findOne({ productId });

        if (!productReview) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        const review = productReview.reviews.id(reviewId);

        // Check if the user is the owner of the review
        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this review' });
        }

        // Update the review fields
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await productReview.save();

        res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update review', error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { productId, reviewId } = req.params;
    const userId = req.user._id 

    try {
        const productReview = await reviewModel.findOne({ productId });

        if (!productReview) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        const review = productReview.reviews.id(reviewId);

        // Check if the user is the owner of the review
        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        // Remove the review
        review.remove();

        await productReview.save();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};
