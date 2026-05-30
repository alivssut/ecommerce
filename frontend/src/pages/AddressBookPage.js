import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddressCard from '../components/address/AddressCard';
import AddressFormModal from '../components/address/AddressFormModal';
import {
  fetchAddresses,
  deleteAddress,
  setDefaultAddress,
} from '../redux/address/addressThunks';
import styles from './AddressBookPage.module.css';

const AddressBookPage = () => {
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.address);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingAddress(null);
    setShowModal(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('آیا از حذف این آدرس اطمینان دارید؟')) return;
    try {
      await dispatch(deleteAddress(id)).unwrap();
      toast.success('آدرس حذف شد.');
    } catch (error) {
      toast.error(error?.error || 'خطا در حذف آدرس.');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await dispatch(setDefaultAddress(id)).unwrap();
      toast.success('آدرس پیش‌فرض تنظیم شد.');
    } catch (error) {
      toast.error(error?.error || 'خطا در تنظیم آدرس پیش‌فرض.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  const handleModalSuccess = () => {
    handleModalClose();
    dispatch(fetchAddresses());
  };

  return (
    <div className={styles.addressPage}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.pageTitle}>دفترچه آدرس</h2>
          <Button variant="primary" onClick={handleAdd}>
            + افزودن آدرس جدید
          </Button>
        </div>
        {loading ? (
          <div className={styles.loading}>
            <Spinner animation="border" />
          </div>
        ) : addresses.length === 0 ? (
          <Alert variant="info">هیچ آدرسی ثبت نشده است.</Alert>
        ) : (
          <Row>
            {addresses.map((addr) => (
              <Col md={6} key={addr.id} className="mb-3">
                <AddressCard
                  address={addr}
                  onEdit={() => handleEdit(addr)}
                  onDelete={() => handleDelete(addr.id)}
                  onSetDefault={() => handleSetDefault(addr.id)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <AddressFormModal
        show={showModal}
        onHide={handleModalClose}
        address={editingAddress}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default AddressBookPage;