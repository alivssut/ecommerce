import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import '../../assets/css/review-form.css';

const ReviewForm = ({ onReviewAdded }) => {
    const { slug } = useParams();
    const [rating, setRating] = useState(1);
    const [subject, setSubject] = useState('');
    const [review, setReview] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost/api/v1/products/${slug}/reviews/`, {
                rating,
                subject,
                review
            });
            // Notify parent component
            onReviewAdded();
            // Clear the form and show success message
            setRating(1);
            setSubject('');
            setReview('');
            setSuccess('Your review has been submitted successfully!');
            setError(null);
        } catch (err) {
            setError('Error submitting review. Please try again.');
            setSuccess(null);
            console.error('Error submitting review:', err);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="review-form">
            <h3 className="form-title">ثبت نظر شما</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form.Group controlId="formSubject">
                <Form.Label>عنوان نظر</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="عنوان نظر خود را وارد کنید"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-field"
                />
            </Form.Group>

            <Form.Group controlId="formRating">
            <Form.Label>امتیاز</Form.Label>
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((val) => (
                        <FaStar
                            key={val}
                            size={30}
                            style={{ cursor: 'pointer', marginRight: 5 }}
                            color={val <= rating ? "#ffc107" : "#e4e5e9"} // Use Math.floor to ensure the rating is an integer
                            onClick={() => setRating(val)} // Set rating as an integer
                        />
                    ))}
                    <span className="rating-value">{rating}/5</span> {/* Ensure rating is shown as an integer */}
                </div>
            </Form.Group>

            <Form.Group controlId="formReview">
                <Form.Label>متن نظر</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="نظر خود را وارد کنید"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="input-field"
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-btn">
                ثبت نظر
            </Button>
        </Form>
    );
};

export default ReviewForm;
