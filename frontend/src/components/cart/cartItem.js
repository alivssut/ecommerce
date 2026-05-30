import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Button, Form, Spinner } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import styles from './CartItem.module.css';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleDecrease = async () => {
    const newQty = quantity - 1;
    if (newQty < 1) return;

    const previousQty = quantity;
    setQuantity(newQty);
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.id, newQty);
    } catch (error) {
      setQuantity(previousQty);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIncrease = async () => {
    const newQty = quantity + 1;
    const previousQty = quantity;
    setQuantity(newQty);
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.id, newQty);
    } catch (error) {
      setQuantity(previousQty);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setQuantity(val);
    }
  };

  const handleQuantityBlur = async () => {
    if (quantity !== item.quantity && quantity >= 1) {
      const previousQty = item.quantity;
      setIsUpdating(true);
      try {
        await onUpdateQuantity(item.id, quantity);
      } catch (error) {
        setQuantity(previousQty);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.id);
    } catch (error) {
      setIsRemoving(false);
    }
  };

  const itemTotal = item.price * quantity;

  const getVariantLabel = () => {
    if (!item.variant?.attributes?.length) return null;
    return item.variant.attributes
      .map(attr => `${attr.attribute_name}: ${attr.value}`)
      .join(' - ');
  };

  return (
    <Card className={`${styles.cartItem} ${isUpdating ? styles.updating : ''}`}>
      <Row className="align-items-center g-0">
        <Col xs={3} md={2} className={styles.imageCol}>
          <Image
            src={item.product_image}
            alt={item.product_name}
            fluid
            rounded
            className={styles.productImage}
          />
        </Col>
        <Col xs={9} md={4} className={styles.detailsCol}>
          <h5 className={styles.productName}>{item.product_name}</h5>
          <p className={styles.unitPrice}>
            قیمت واحد: {item.price.toLocaleString()} تومان
          </p>
          {item.variant && (
            <small className={styles.variantInfo}>
              {getVariantLabel()}
            </small>
          )}
        </Col>
        <Col xs={8} md={3} className={styles.quantityCol}>
          <div className={styles.quantityControl}>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleDecrease}
              disabled={quantity <= 1 || isUpdating}
              className={styles.qtyBtn}
            >
              <FaMinus />
            </Button>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              disabled={isUpdating}
              className={styles.quantityInput}
            />
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleIncrease}
              disabled={isUpdating}
              className={styles.qtyBtn}
            >
              <FaPlus />
            </Button>
          </div>
        </Col>
        <Col xs={4} md={2} className={styles.totalCol}>
          <p className={styles.itemTotal}>
            {itemTotal.toLocaleString()} تومان
          </p>
        </Col>
        <Col xs={12} md={1} className={styles.removeCol}>
          <Button
            variant="link"
            className={styles.removeBtn}
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FaTrash />
            )}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;