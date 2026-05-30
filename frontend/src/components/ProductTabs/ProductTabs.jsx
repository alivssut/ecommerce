import React, { useMemo } from 'react';
import { Tab, Nav, Table } from 'react-bootstrap';
import ReviewForm from '../review/reviewForm';
import ReviewList from '../review/reviewList';
import styles from './ProductTabs.module.css';

const ProductTabs = ({ product, reviews, token, onReviewAdded }) => {
  const groupedAttributes = useMemo(() => {
    if (!product.attributes || product.attributes.length === 0) return {};
    
    return product.attributes.reduce((acc, attr) => {
      const key = attr.attribute?.name || attr.name || 'سایر';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(attr.value);
      return acc;
    }, {});
  }, [product.attributes]);

  const hasAttributes = Object.keys(groupedAttributes).length > 0;

  return (
    <Tab.Container defaultActiveKey="details">
      <div className={styles.tabsContainer}>
        <Nav variant="tabs" className={styles.customTabs}>
          <Nav.Item>
            <Nav.Link eventKey="details" className={styles.tabLink}>
              جزئیات محصول
            </Nav.Link>
          </Nav.Item>
          {hasAttributes && (
            <Nav.Item>
              <Nav.Link eventKey="specifications" className={styles.tabLink}>
                مشخصات فنی
              </Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item>
            <Nav.Link eventKey="reviews" className={styles.tabLink}>
              نظرات ({reviews.count || 0})
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className={styles.tabContent}>
          <Tab.Pane eventKey="details">
            <div className={styles.description}>
              <p>{product.description || 'توضیحاتی برای این محصول ثبت نشده است.'}</p>
            </div>
          </Tab.Pane>

          {hasAttributes && (
            <Tab.Pane eventKey="specifications">
              <div className={styles.specifications}>
                <Table striped bordered hover responsive className={styles.attrTable}>
                  <thead>
                    <tr>
                      <th>ویژگی</th>
                      <th>مقادیر</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(groupedAttributes).map(([name, values]) => (
                      <tr key={name}>
                        <td>{name}</td>
                        <td>{values.join('، ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>
          )}

          <Tab.Pane eventKey="reviews">
            <div className={styles.reviewsSection}>
              {token ? (
                <ReviewForm onReviewAdded={onReviewAdded} productId={product.id} />
              ) : (
                <div className={styles.loginPrompt}>
                  <p>
                    برای ارسال دیدگاه <a href="/login/">وارد</a> شوید.
                  </p>
                </div>
              )}
              <ReviewList reviews={reviews} />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
};

export default ProductTabs;