import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchProfile, updateProfile } from '../redux/profile/profileThunks';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    national_code: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        national_code: profile.national_code || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success('پروفایل با موفقیت به‌روزرسانی شد.');
      setEditing(false);
    } catch (err) {
      toast.error(err?.error || 'خطا در به‌روزرسانی پروفایل.');
    }
  };

  if (loading && !profile) {
    return (
      <div className={styles.loading}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <Container>
        <h2 className={styles.pageTitle}>پروفایل کاربری</h2>
        <Row>
          <Col lg={8}>
            <Card className={styles.profileCard}>
              <Card.Body>
                {!editing ? (
                  <div className={styles.profileView}>
                    <div className={styles.field}>
                      <span className={styles.label}>نام کاربری:</span>
                      <span className={styles.value}>{profile?.username}</span>
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>ایمیل:</span>
                      <span className={styles.value}>{profile?.email}</span>
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>نام:</span>
                      <span className={styles.value}>{profile?.first_name || '—'}</span>
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>نام خانوادگی:</span>
                      <span className={styles.value}>{profile?.last_name || '—'}</span>
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>تلفن:</span>
                      <span className={styles.value}>{profile?.phone || '—'}</span>
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>کد ملی:</span>
                      <span className={styles.value}>{profile?.national_code || '—'}</span>
                    </div>
                    <Button variant="primary" onClick={() => setEditing(true)}>
                      ویرایش پروفایل
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>نام</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>نام خانوادگی</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>تلفن</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>کد ملی</Form.Label>
                      <Form.Control
                        type="text"
                        name="national_code"
                        value={formData.national_code}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button type="submit" variant="success" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : 'ذخیره تغییرات'}
                    </Button>
                    <Button variant="secondary" className="ms-2" onClick={() => setEditing(false)}>
                      انصراف
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;