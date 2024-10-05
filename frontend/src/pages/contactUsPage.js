import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../assets/css/contactUs.css'; // Custom CSS for additional styling

const ContactUsPage = () => {
  return (
    <Container className="contact-us-page my-5">
      <Row>
        <Col lg={6} className="contact-info">
          <h2 className="mb-4">تماس با ما</h2>
          <p>برای هرگونه سوال یا پشتیبانی می‌توانید با ما تماس بگیرید.</p>
          <p>
            <strong>آدرس:</strong> خیابان ولیعصر، تهران، ایران
          </p>
          <p>
            <strong>ایمیل:</strong> info@example.com
          </p>
          <p>
            <strong>تلفن:</strong> 021-12345678
          </p>
        </Col>
        <Col lg={6} className="contact-form">
          <h3 className="mb-4">فرم تماس</h3>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>نام شما</Form.Label>
              <Form.Control type="text" placeholder="نام خود را وارد کنید" />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>ایمیل شما</Form.Label>
              <Form.Control type="email" placeholder="ایمیل خود را وارد کنید" />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>پیام شما</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="پیام خود را وارد کنید" />
            </Form.Group>

            <Button variant="primary" className="mt-3" type="submit">
              ارسال پیام
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4 className="mb-4">ما را روی نقشه پیدا کنید</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.4464574505!2d51.38932845120941!3d35.68919838017124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e011040b898b5%3A0xd5501c5d8b45a618!2sValiasr%20St%2C%20Tehran%2C%20Iran!5e0!3m2!1sen!2s!4v1632994504512!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPage;
