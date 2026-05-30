import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import styles from './AddressCard.module.css';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  return (
    <Card className={styles.addressCard}>
      <Card.Body>
        {address.selected && (
          <Badge bg="success" className={styles.defaultBadge}>
            <FaCheck /> پیش‌فرض
          </Badge>
        )}
        <h5 className={styles.name}>{address.full_name}</h5>
        <p className={styles.phone}>{address.phone}</p>
        <p className={styles.address}>
          {address.province_detail?.name}، {address.city_detail?.name}
          <br />
          {address.address}
        </p>
        <p className={styles.postal}>کد پستی: {address.post_code}</p>
        <div className={styles.actions}>
          <Button variant="outline-primary" size="sm" onClick={onEdit}>
            <FaEdit /> ویرایش
          </Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            <FaTrash /> حذف
          </Button>
          {!address.selected && (
            <Button variant="outline-success" size="sm" onClick={onSetDefault}>
              تنظیم به عنوان پیش‌فرض
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AddressCard;