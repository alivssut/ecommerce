import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { login } from '../redux/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../redux/auth/authThunks';
import '../assets/css/login.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    console.log(loading)
    if (token) {
      navigate('/');
    }
  }, [token]);

  const getErrorMessage = (error) => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if (error.non_field_errors) return error.non_field_errors.join(', ');
    return 'خطایی رخ داده است';
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center">ورود به حساب کاربری</h2>
              {error && <Alert variant="danger">{getErrorMessage(error)}</Alert>} 
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>نام کاربری</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>کلمه عبور</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="کلمه عبور خود را وارد کنید"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button 
                  variant="warning"
                  type="submit"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? 'در حال ورود...' : 'ورود'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;