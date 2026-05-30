import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, NavLink } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaShoppingBag, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const navItems = [
    { path: 'profile', label: 'پروفایل', icon: <FaUser /> },
    { path: 'addresses', label: 'آدرس‌ها', icon: <FaMapMarkerAlt /> },
    { path: 'orders', label: 'سفارش‌ها', icon: <FaShoppingBag /> },
    { path: 'wishlist', label: 'علاقه‌مندی‌ها', icon: <FaHeart />, disabled: true },
  ];

  return (
    <div className={styles.dashboard}>
      <Container fluid="lg">
        <Row>
          <Col lg={3} xl={3}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <h5>حساب کاربری</h5>
              </div>
              <nav className={styles.nav}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.disabled ? '#' : item.path}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`
                    }
                    onClick={(e) => item.disabled && e.preventDefault()}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                    {item.disabled && <span className={styles.comingSoon}>به زودی</span>}
                  </NavLink>
                ))}
              </nav>
              <div className={styles.sidebarFooter}>
                <button className={styles.logoutBtn}>
                  <FaSignOutAlt /> خروج
                </button>
              </div>
            </div>
          </Col>
          <Col lg={9} xl={9}>
            <div className={styles.content}>
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;