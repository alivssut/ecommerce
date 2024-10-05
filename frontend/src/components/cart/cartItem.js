import React, { useState } from 'react';
import { Button, Card, Col, Row, Image, InputGroup, FormControl } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onUpdateQuantity(item.product_name, quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onUpdateQuantity(item.id, quantity + 1);
  };

  return (
    <Card className="mb-3 p-3 shadow-sm">
      <Row className="align-items-center">
        <Col xs={4} md={2}>
          <Image src={item.product_image} alt={item.product_name} fluid rounded />
        </Col>
        <Col xs={8} md={4}>
          <h5>{item.product_name}</h5>
          <p className="text-muted">قیمت واحد: {item.price.toLocaleString()} تومان</p>
        </Col>
        <Col xs={12} md={3}>
          <InputGroup className="quantity-control">
            <Button variant="outline-secondary" onClick={handleDecrease}>
              <FaMinus />
            </Button>
            <FormControl
              type="text"
              value={quantity}
              readOnly
              className="text-center"
              style={{ maxWidth: '50px' }}
            />
            <Button variant="outline-secondary" onClick={handleIncrease}>
              <FaPlus />
            </Button>
          </InputGroup>
        </Col>
        <Col xs={6} md={2}>
          <p>قیمت کل: {(item.price * quantity).toLocaleString()} تومان</p>
        </Col>
        <Col xs={6} md={1} className="text-end">
          <Button variant="danger" onClick={() => onRemove(item.id)}>
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
