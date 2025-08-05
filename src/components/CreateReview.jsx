import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import '../css/CreateReview.css';

const CreateReview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get user info from Redux store
    const { username, userToken } = useSelector(state => state.users);

    // Get parameters from URL
    const productId = parseInt(searchParams.get('productId')) || 1;
    const orderId = parseInt(searchParams.get('orderId')) || 1;

    // Decode JWT to get user ID (customerId)
    const getUserIdFromToken = () => {
        try {
            if (!userToken) return 1; // fallback for testing
            const token = JSON.parse(userToken);
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub || payload.userId || payload.id || 1; // different JWT structures
        } catch (error) {
            console.error('Error decoding token:', error);
            return 1; // fallback for testing
        }
    };

    const [formData, setFormData] = useState({
        productId: productId,
        customerId: getUserIdFromToken(),
        orderId: orderId,
        rating: 0,
        reviewTitle: '',
        reviewText: '',
        imageUrls: ''
    });

    const [loading, setLoading] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [checkingReview, setCheckingReview] = useState(true);
    const [productInfo, setProductInfo] = useState({
        id: productId,
        name: "Loading Product...",
        image: "https://via.placeholder.com/200x200",
        price: 0
    });

    useEffect(() => {
        if (!userToken) {
            toast.error('Please login to write a review');
            navigate('/signin');
            return;
        }

        checkIfAlreadyReviewed();
        fetchProductDetails();
    }, [productId, userToken]);

    const fetchProductDetails = async () => {
        try {
            // Try to fetch product details - adjust endpoint as needed
            const response = await api.get(`/api/products/${productId}`);
            setProductInfo({
                id: response.data.id,
                name: response.data.name || response.data.title,
                image: response.data.image || response.data.imageUrl || "https://via.placeholder.com/200x200",
                price: response.data.price || 0
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
            // Keep mock data if API fails
            setProductInfo(prev => ({
                ...prev,
                name: `Product #${productId}`,
                price: 299.99
            }));
        }
    };

    const checkIfAlreadyReviewed = async () => {
        try {
            setCheckingReview(true);
            const response = await api.get('/api/reviews/has-reviewed', {
                params: {
                    customerId: formData.customerId,
                    productId: formData.productId,
                    orderId: formData.orderId
                }
            });
            setHasReviewed(response.data);
        } catch (error) {
            console.error('Error checking review status:', error);
            // Don't show error toast here, might be normal if no reviews exist
            setHasReviewed(false);
        } finally {
            setCheckingReview(false);
        }
    };

    const goBackToOrders = () => {
        navigate('/orders');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (formData.reviewText.trim().length < 10) {
            toast.error('Review text must be at least 10 characters long');
            return;
        }

        try {
            setLoading(true);

            const reviewData = {
                ...formData,
                isVerifiedPurchase: true,
                status: 'pending'
            };

            const response = await api.post('/api/reviews', reviewData);
            console.log('Review created:', response.data);

            toast.success('Review submitted successfully! It will be visible after approval.');

            // Redirect back to orders page after 2 seconds
            setTimeout(() => {
                goBackToOrders();
            }, 2000);

        } catch (error) {
            console.error('Error creating review:', error);

            // Handle different error scenarios
            if (error.response?.status === 409) {
                toast.error('You have already reviewed this product');
                setHasReviewed(true);
            } else if (error.response?.status === 400) {
                toast.error('Invalid review data. Please check your input.');
            } else if (error.response?.status === 401) {
                toast.error('Please login to submit a review');
                navigate('/signin');
            } else {
                toast.error('Failed to submit review. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Show loading while checking review status
    if (checkingReview) {
        return (
            <div className="review-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Checking review status...</p>
                </div>
            </div>
        );
    }

    // Show message if already reviewed
    if (hasReviewed) {
        return (
            <div className="review-container">
                <div className="already-reviewed">
                    <div className="already-reviewed-icon">✓</div>
                    <h2>Review Already Submitted</h2>
                    <p>You have already reviewed this product. You can only submit one review per product.</p>
                    <button className="back-btn" onClick={goBackToOrders}>
                        Go Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="review-container">
            <div className="review-header">
                <h1>Write a Review</h1>
                <p>Share your experience with this product</p>
            </div>

            <div className="product-info">
                <img
                    src={productInfo.image}
                    alt={productInfo.name}
                    className="product-image"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x200?text=Product";
                    }}
                />
                <div className="product-details">
                    <h3>{productInfo.name}</h3>
                    {productInfo.price > 0 && (
                        <p className="product-price">₹{productInfo.price.toFixed(2)}</p>
                    )}
                    <p className="customer-info">Reviewing as: {username}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
                {/* Rating Section */}
                <div className="form-group">
                    <label className="form-label">Overall Rating *</label>
                    <div className="rating-container">
                        <div className="stars-wrapper">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star ${formData.rating >= star ? 'filled' : ''}`}
                                    onClick={() => handleRatingClick(star)}
                                    aria-label={`Rate ${star} stars`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <span className="rating-text">
                            {formData.rating > 0 ? (
                                <>
                                    <strong>{formData.rating} out of 5 stars</strong>
                                    <span className="rating-label">
                                        {formData.rating === 1 && " - Poor"}
                                        {formData.rating === 2 && " - Fair"}
                                        {formData.rating === 3 && " - Good"}
                                        {formData.rating === 4 && " - Very Good"}
                                        {formData.rating === 5 && " - Excellent"}
                                    </span>
                                </>
                            ) : (
                                "Click stars to rate"
                            )}
                        </span>
                    </div>
                </div>

                {/* Review Title */}
                <div className="form-group">
                    <label htmlFor="reviewTitle" className="form-label">
                        Review Title (Optional)
                    </label>
                    <input
                        type="text"
                        id="reviewTitle"
                        name="reviewTitle"
                        value={formData.reviewTitle}
                        onChange={handleInputChange}
                        placeholder="Give your review a catchy title"
                        maxLength="200"
                        className="form-input"
                    />
                    <small className="help-text">
                        {200 - formData.reviewTitle.length} characters remaining
                    </small>
                </div>

                {/* Review Text */}
                <div className="form-group">
                    <label htmlFor="reviewText" className="form-label">
                        Your Review *
                    </label>
                    <textarea
                        id="reviewText"
                        name="reviewText"
                        value={formData.reviewText}
                        onChange={handleInputChange}
                        placeholder="Tell others about your experience with this product. What did you like or dislike? How did it meet your expectations?"
                        required
                        minLength="10"
                        maxLength="1000"
                        rows="6"
                        className="form-textarea"
                    />
                    <small className="char-count">
                        {formData.reviewText.length}/1000 characters
                        {formData.reviewText.length < 10 && formData.reviewText.length > 0 && (
                            <span className="min-chars"> (Minimum 10 characters required)</span>
                        )}
                    </small>
                </div>

                {/* Image URLs (Optional) */}
                <div className="form-group">
                    <label htmlFor="imageUrls" className="form-label">
                        Image URLs (Optional)
                    </label>
                    <input
                        type="text"
                        id="imageUrls"
                        name="imageUrls"
                        value={formData.imageUrls}
                        onChange={handleInputChange}
                        placeholder="Add image URLs separated by commas (e.g., http://example.com/image1.jpg, http://example.com/image2.jpg)"
                        className="form-input"
                    />
                    <small className="help-text">
                        📷 Add URLs of images to showcase the product with your review
                    </small>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={loading || formData.rating === 0}
                        className="submit-btn"
                    >
                        {loading ? (
                            <>
                                <span className="btn-spinner"></span>
                                Submitting Review...
                            </>
                        ) : (
                            'Submit Review'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={goBackToOrders}
                        className="cancel-btn"
                        disabled={loading}
                    >
                        Back to Orders
                    </button>
                </div>

                {/* Form Info */}
                <div className="form-info">
                    <p>
                        ℹ️ Your review will be published after approval by our team.
                        This helps maintain the quality and authenticity of reviews.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CreateReview;