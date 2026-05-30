import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addAddress, updateAddress } from '../../redux/address/addressThunks';

const AddressFormModal = ({ show, onHide, address, onSuccess }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    country: '',
    province: '',
    city: '',
    address: '',
    post_code: '',
  });

  useEffect(() => {
    axios.get('http://localhost/api/v1/location/countries/').then(res => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (address) {
      setFormData({
        full_name: address.full_name,
        phone: address.phone,
        country: address.country,
        province: address.province,
        city: address.city,
        address: address.address,
        post_code: address.post_code,
      });
      if (address.country) fetchRegions(address.country);
      if (address.province) fetchCities(address.province);
    } else {
      setFormData({
        full_name: '', phone: '', country: '', province: '', city: '', address: '', post_code: ''
      });
    }
  }, [address]);

  const fetchRegions = async (countryId) => {
    const res = await axios.get(`http://localhost/api/v1/location/regions/?country=${countryId}`);
    setRegions(res.data);
  };

  const fetchCities = async (regionId) => {
    const res = await axios.get(`http://localhost/api/v1/location/cities/?region=${regionId}`);
    setCities(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'country') {
      setRegions([]);
      setCities([]);
      setFormData(prev => ({ ...prev, province: '', city: '' }));
      if (value) fetchRegions(value);
    }
    if (name === 'province') {
      setCities([]);
      setFormData(prev => ({ ...prev, city: '' }));
      if (value) fetchCities(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (address) {
        await dispatch(updateAddress(address.id, formData)).unwrap();
        toast.success('آدرس با موفقیت ویرایش شد.');
      } else {
        await dispatch(addAddress(formData)).unwrap();
        toast.success('آدرس جدید اضافه شد.');
      }
      onSuccess();
    } catch (error) {
      toast.error(error?.error || 'خطا در ذخیره آدرس.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{address ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>نام و نام خانوادگی</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>شماره تماس</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>کشور</Form.Label>
                <Form.Select name="country" value={formData.country} onChange={handleChange} required>
                  <option value="">انتخاب کشور</option>
                  {countries.map(c => <option key={c.id} value={c.id}>{c.display_name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>استان</Form.Label>
                <Form.Select name="province" value={formData.province} onChange={handleChange} required disabled={!formData.country}>
                  <option value="">انتخاب استان</option>
                  {regions.map(r => <option key={r.id} value={r.id}>{r.display_name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>شهر</Form.Label>
                <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.province}>
                  <option value="">انتخاب شهر</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.display_name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>آدرس پستی</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>کد پستی</Form.Label>
                <Form.Control
                  type="text"
                  name="post_code"
                  value={formData.post_code}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>انصراف</Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'ذخیره'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddressFormModal;