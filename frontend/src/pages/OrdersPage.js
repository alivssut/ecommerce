import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Spinner, Alert, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';
import { fetchOrders } from '../redux/order/orderThunks';
import styles from './OrdersPage.module.css';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending': { text: 'در انتظار پرداخت', variant: 'warning' },
      'Processing': { text: 'در حال پردازش', variant: 'info' },
      'Shipped': { text: 'ارسال شده', variant: 'primary' },
      'Completed': { text: 'تحویل شده', variant: 'success' },
      'Refunded': { text: 'مرجوعی', variant: 'danger' },
    };
    const s = statusMap[status] || { text: status, variant: 'secondary' };
    return <Badge bg={s.variant}>{s.text}</Badge>;
  };

  const filterOrders = (tab) => {
    if (!orders) return [];
    switch (tab) {
      case 'current':
        return orders.filter(order => 
          ['Pending', 'Processing', 'Shipped'].includes(order.status)
        );
      case 'delivered':
        return orders.filter(order => order.status === 'Completed');
      case 'returned':
        return orders.filter(order => order.status === 'Refunded');
      default:
        return orders;
    }
  };

  const handlePayment = (orderId) => {
    navigate(`/payment/${orderId}`);
  };

  const filteredOrders = filterOrders(activeTab);

  const tabCounts = {
    current: orders?.filter(o => ['Pending', 'Processing', 'Shipped'].includes(o.status)).length || 0,
    delivered: orders?.filter(o => o.status === 'Completed').length || 0,
    returned: orders?.filter(o => o.status === 'Refunded').length || 0,
  };

  if (loading) {
    return <div className={styles.loading}><Spinner animation="border" /></div>;
  }

  if (error) {
    return <Alert variant="danger">{error.error || error.message || 'خطا در بارگذاری سفارش‌ها'}</Alert>;
  }

  return (
    <div className={styles.ordersPage}>
      <h4 className={styles.title}>سفارش‌های من</h4>
      
      <Nav variant="tabs" className={styles.tabs} activeKey={activeTab} onSelect={setActiveTab}>
        <Nav.Item>
          <Nav.Link eventKey="current">
            جاری ({tabCounts.current})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="delivered">
            تحویل شده ({tabCounts.delivered})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="returned">
            مرجوعی ({tabCounts.returned})
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {filteredOrders.length === 0 ? (
        <Alert variant="info" className={styles.emptyAlert}>
          {activeTab === 'current' && 'سفارش جاری ندارید.'}
          {activeTab === 'delivered' && 'سفارش تحویل شده ندارید.'}
          {activeTab === 'returned' && 'سفارش مرجوعی ندارید.'}
        </Alert>
      ) : (
        <Table responsive hover className={styles.table}>
          <thead>
            <tr>
              <th>کد سفارش</th>
              <th>تاریخ</th>
              <th>مبلغ کل</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.code}</td>
                <td>{new Date(order.created).toLocaleDateString('fa-IR')}</td>
                <td>{order.total_price?.toLocaleString()} تومان</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>
                  <div className={styles.actions}>
                    <a href={`/dashboard/orders/${order.id}`} className={styles.detailLink}>
                      مشاهده
                    </a>
                    {order.status === 'Pending' && (
                      <Button
                        variant="warning"
                        size="sm"
                        className={styles.payBtn}
                        onClick={() => handlePayment(order.id)}
                      >
                        <FaCreditCard className="ms-1" /> پرداخت
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrdersPage;