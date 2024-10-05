import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../assets/css/aboutUs.css'; // Custom CSS for styling

const AboutUsPage = () => {
  return (
    <Container className="about-us-page my-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="main-title">درباره ما</h1>
          <p className="intro-text">
            ما با افتخار در تلاشیم تا بهترین محصولات و خدمات را برای مشتریان خود فراهم کنیم. در مسیر خود به ارزش‌های اصلی چون کیفیت، نوآوری و مشتری‌مداری پایبندیم.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={6}>
          <Card className="info-card mb-4">
            <Card.Body>
              <Card.Title className="card-title">ماموریت ما</Card.Title>
              <Card.Text>
                ماموریت ما ارائه بهترین محصولات و خدمات با کیفیت بالا برای مشتریان است. ما به طور مداوم در حال نوآوری و بهبود هستیم تا تجربه‌ای بهتر برای مشتریانمان ایجاد کنیم.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="info-card mb-4">
            <Card.Body>
              <Card.Title className="card-title">تاریخچه ما</Card.Title>
              <Card.Text>
                شرکت ما از سال ۱۳۹۰ با هدف ارائه محصولات با کیفیت تأسیس شد و تاکنون با رشد پیوسته خود، به یکی از معتبرترین شرکت‌های حوزه خود تبدیل شده است.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="text-center section-title">ارزش‌های ما</h2>
        </Col>
        <Col lg={4}>
          <Card className="info-card mb-4">
            <Card.Body>
              <Card.Title className="card-title">کیفیت</Card.Title>
              <Card.Text>
                ما به کیفیت محصولات و خدمات خود اهمیت بسیاری می‌دهیم و همواره در پی حفظ و بهبود آن هستیم.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="info-card mb-4">
            <Card.Body>
              <Card.Title className="card-title">نوآوری</Card.Title>
              <Card.Text>
                نوآوری در محصولات و فرآیندهای ما نقش مهمی در بهبود مستمر و دستیابی به اهدافمان دارد.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="info-card mb-4">
            <Card.Body>
              <Card.Title className="card-title">مشتری‌مداری</Card.Title>
              <Card.Text>
                مشتریان ما مهم‌ترین سرمایه ما هستند و تمام تلاش ما در جهت رفع نیازهای آنها است.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
