import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PaymentVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      try {
        const response = await axios.get(`http://localhost/api/v1/payments/zarinpal/verify/${window.location.search}`);
        if (response.data.status === 'success') {
          navigate(`/order-success/${response.data.order_id}`);
        } else {
          navigate('/payment-failed');
        }
      } catch (error) {
        navigate('/payment-failed');
      }
    };
    verify();
  }, []);

  return (
    <Container className="text-center mt-5">
      <Spinner animation="border" />
      <p>در حال بررسی وضعیت پرداخت...</p>
    </Container>
  );
};

export default PaymentVerifyPage;