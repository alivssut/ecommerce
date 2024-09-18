import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import '../../assets/css/reviewList.css';

const ReviewList = ({ reviews }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar
                key={i}
                color={i < rating ? "#ffc107" : "#e4e5e9"}
                size={20}
            />
        ));
    };

    return (
        <Card className="review-card">
            <Card.Header className="review-header">نظرات</Card.Header>
            {reviews.results.length > 0 ? (
                <ListGroup variant="flush">
                    {reviews.results.map((review) => (
                        <ListGroup.Item key={review.id} className="review-item">
                            <Row>
                                <Col>
                                    <h5 className="review-subject">{review.subject}</h5>
                                </Col>
                                <Col className="text-right">
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                        <span className="ml-2">{review.rating}/5</span>
                                    </div>
                                </Col>
                            </Row>
                            <p className="review-text">{review.review}</p>
                            <small>نویسنده: {review.user.username}</small>
                            <br />
                            <small className="text-muted">
                                تاریخ ثبت نظر: {new Date(review.created_at).toLocaleDateString()}
                            </small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <Card.Body>نظری ثبت نشده است</Card.Body>
            )}
        </Card>
    );
};

export default ReviewList;