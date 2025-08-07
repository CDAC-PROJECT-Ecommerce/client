import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, resetReviewStatus } from '../store/slice/ReviewSlice';
import '../scss/createReview.scss';

const CreateReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { status } = useSelector(state => state.review);
    const { loading: createReviewLoading, error: createReviewError, success: createReviewSuccess } = status.create;

    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const orderId = searchParams.get('orderId');

    const user = localStorage.getItem('user');
    const userInfo = user ? JSON.parse(user) : null;

    const [reviewData, setReviewData] = useState({
        rating: 0,
        reviewTitle: '',
        reviewText: '',
        imageUrls: ''
    });

    const [errors, setErrors] = useState({});
    const [customErrorMessage, setCustomErrorMessage] = useState('');

    useEffect(() => {
        dispatch(resetReviewStatus());
    }, [dispatch]);


    const validateForm = () => {
        const newErrors = {};
        if (!reviewData.rating) newErrors.rating = 'Please select a rating';
        if (!reviewData.reviewTitle.trim()) newErrors.reviewTitle = 'Title is required';
        if (!reviewData.reviewText.trim()) newErrors.reviewText = 'Review text is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleRatingClick = (rating) => {
        setReviewData(prev => ({ ...prev, rating }));
        if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!productId || !orderId || !userInfo?.id) {
            alert('Missing required information');
            return;
        }

        try {
            await dispatch(
                createReview({
                    productId: parseInt(productId),
                    customerId: userInfo.id,
                    orderId: parseInt(orderId),
                    rating: reviewData.rating,
                    reviewTitle: reviewData.reviewTitle.trim(),
                    reviewText: reviewData.reviewText.trim(),
                    imageUrls: reviewData.imageUrls.trim() || null
                })
            ).unwrap();
            navigate('/myOrders');
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data ||
                error?.message ||
                "Something went wrong";
            setCustomErrorMessage(message);
            console.error('Review submission failed:', message);
        }
    };

    if (!productId || !orderId) {
        return (
            <div className="create-review-error">
                <h2>Invalid Request</h2>
                <p>Missing product or order information.</p>
                <button onClick={() => navigate('/myOrders')} className="btn-primary">
                    Back to Orders
                </button>
            </div>
        );
    }

    if (!userInfo || !userInfo.id) {
        return (
            <div className="create-review-error">
                <h2>Not Logged In</h2>
                <p>Please log in to submit a review.</p>
                <button onClick={() => navigate('/login')} className="btn-primary">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="create-review-container">
            <div className="create-review-header">
                <h1>Write a Review</h1>
                <p>Share your experience with this product.</p>
            </div>

            {createReviewSuccess && (
                <div className="success-message">
                    <p>Review submitted successfully.</p>
                </div>
            )}

            {customErrorMessage && (
                <div className="error-message-banner">
                    <p>Error: {customErrorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="create-review-form">
                <div className="form-group">
                    <label className="form-label">Rating *</label>
                    <div className="rating-container">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`star ${reviewData.rating >= star ? 'active' : ''}`}
                                onClick={() => handleRatingClick(star)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {errors.rating && <span className="error-message">{errors.rating}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="reviewTitle" className="form-label">Review Title *</label>
                    <input
                        type="text"
                        id="reviewTitle"
                        name="reviewTitle"
                        value={reviewData.reviewTitle}
                        onChange={handleInputChange}
                        placeholder="Summarize your review"
                        maxLength={200}
                        className={`form-input ${errors.reviewTitle ? 'error' : ''}`}
                    />
                    {errors.reviewTitle && <span className="error-message">{errors.reviewTitle}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="reviewText" className="form-label">Review *</label>
                    <textarea
                        id="reviewText"
                        name="reviewText"
                        value={reviewData.reviewText}
                        onChange={handleInputChange}
                        placeholder="Share details about your experience"
                        rows={6}
                        className={`form-textarea ${errors.reviewText ? 'error' : ''}`}
                    />
                    {errors.reviewText && <span className="error-message">{errors.reviewText}</span>}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/myOrders')}
                        className="btn-secondary"
                        disabled={createReviewLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={createReviewLoading}
                    >
                        {createReviewLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateReview;
