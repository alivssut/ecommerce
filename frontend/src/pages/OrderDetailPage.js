import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner, Alert, Button, Image } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight, FaCreditCard } from 'react-icons/fa';
import { fetchOrderDetail } from '../redux/order/orderThunks';
import styles from './OrderDetailPage.module.css';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetail(orderId));
    }
  }, [dispatch, orderId]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending': { text: 'در انتظار پرداخت', variant: 'warning' },
      'Processing': { text: 'در حال پردازش', variant: 'info' },
      'Shipped': { text: 'ارسال شده', variant: 'primary' },
      'Completed': { text: 'تکمیل شده', variant: 'success' },
      'Refunded': { text: 'مرجوعی', variant: 'danger' },
      'Not Ordered': { text: 'سبد خرید', variant: 'secondary' },
    };
    const s = statusMap[status] || { text: status, variant: 'secondary' };
    return <Badge bg={s.variant}>{s.text}</Badge>;
  };

  const handlePayment = () => {
    navigate(`/payment/${currentOrder.id}`);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className={styles.container}>
        <Alert variant="danger">{error.error || error.message || 'خطا در بارگذاری سفارش'}</Alert>
        <Link to="/dashboard/orders" className="btn btn-secondary">
          <FaArrowRight className="ms-2" /> بازگشت به سفارش‌ها
        </Link>
      </Container>
    );
  }

  if (!currentOrder) return null;

  return (
    <div className={styles.orderDetailPage}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.pageTitle}>جزئیات سفارش</h2>
          <Link to="/dashboard/orders" className={styles.backLink}>
            <FaArrowRight /> بازگشت به سفارش‌ها
          </Link>
        </div>

        <Card className={styles.infoCard}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p><strong>کد سفارش:</strong> {currentOrder.code}</p>
                <p><strong>تاریخ ثبت:</strong> {new Date(currentOrder.created).toLocaleDateString('fa-IR')}</p>
                <p><strong>وضعیت:</strong> {getStatusBadge(currentOrder.status)}</p>
              </Col>
              <Col md={6}>
                <p><strong>نام گیرنده:</strong> {currentOrder.full_name}</p>
                <p><strong>تلفن:</strong> {currentOrder.phone}</p>
                <p><strong>مبلغ کل:</strong> {currentOrder.total_price?.toLocaleString()} تومان</p>
              </Col>
            </Row>
            {currentOrder.status === 'Pending' && (
              <div className={styles.paymentSection}>
                <Button
                  variant="warning"
                  onClick={handlePayment}
                  className={styles.payBtn}
                >
                  <FaCreditCard className="ms-2" />
                  پرداخت سفارش
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        <Card className={styles.addressCard}>
            <Card.Body>
                <h5>آدرس تحویل</h5>
                <p><strong>گیرنده:</strong> {currentOrder.full_name}</p>
                <p><strong>تلفن:</strong> {currentOrder.phone}</p>
                <p><strong>آدرس:</strong> {currentOrder.full_address}</p>
                <p className="text-muted">کد پستی: {currentOrder.address_post_code}</p>
            </Card.Body>
        </Card>

        <Card className={styles.itemsCard}>
            <Card.Body>
                <h5>اقلام سفارش</h5>
                <Table responsive hover className={styles.itemsTable}>
                    <thead>
                        <tr>
                        <th>عکس</th>
                        <th>محصول</th>
                        <th>قیمت واحد</th>
                        <th>تعداد</th>
                        <th>جمع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrder.items?.map((item) => (
                        <tr key={item.id}>
                            <td>
                            {item.product_image ? (
                                <Image
                                src={item.product_image}
                                alt={item.product_name}
                                className={styles.productThumbnail}
                                />
                            ) : (
                                <div className={styles.noImage}>بدون تصویر</div>
                            )}
                            </td>
                            <td>
                            <div className={styles.productInfo}>
                                <span className={styles.productName}>{item.product_name}</span>
                                {item.variant_details && (
                                <small className={styles.variantInfo}>
                                    {item.variant_details.attributes
                                    ?.map(attr => `${attr.attribute_name}: ${attr.value}`)
                                    .join(' - ')}
                                </small>
                                )}
                            </div>
                            </td>
                            <td>{item.price.toLocaleString()} تومان</td>
                            <td>{item.quantity}</td>
                            <td>{(item.price * item.quantity).toLocaleString()} تومان</td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>
      </Container>
    </div>
  );
};

export default OrderDetailPage;