import React, { useState, useMemo, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../../redux/cart/cartThunks';
import newImg from '../../assets/images/product-details/new.jpg';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const hasVariants = product.variants && product.variants.length > 0;
  const isVariable = product.product_type === 'Variable' || hasVariants;

  useEffect(() => {
    if (hasVariants) {
      const defaultVariant =
        product.variants.find(v => v.quantity > 0) || product.variants[0];
      setSelectedVariantId(defaultVariant.id);
    } else {
      setSelectedVariantId(null);
    }
  }, [product, hasVariants]);

  const selectedVariant = useMemo(() => {
    if (!selectedVariantId) return null;
    return product.variants?.find(v => v.id === selectedVariantId);
  }, [selectedVariantId, product.variants]);

  const currentPrice = useMemo(() => {
    if (selectedVariant) {
      return selectedVariant.price > 0 ? selectedVariant.price : product.price;
    }
    return product.price;
  }, [selectedVariant, product.price]);

  const currentStock = selectedVariant ? selectedVariant.quantity : product.amount;
  const currentSku = selectedVariant ? selectedVariant.sku : product.sku;

  const formatPrice = (price) => {
    return parseInt(price).toLocaleString();
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setQuantity(val);
    } else {
      setQuantity(1);
    }
  };

  const handleVariantChange = (e) => {
    const variantId = parseInt(e.target.value);
    setSelectedVariantId(variantId);
  };

  const handleAddToCart = () => {
    if (!isVariable && product.amount <= 0) {
      toast.error('این محصول در حال حاضر موجود نیست.');
      return;
    }
    if (isVariable && !selectedVariantId) {
      toast.error('لطفاً یک گزینه را انتخاب کنید.');
      return;
    }
    if (quantity <= 0) {
      toast.error('تعداد باید بیشتر از صفر باشد!');
      return;
    }
    const maxStock = selectedVariant ? selectedVariant.quantity : product.amount;
    if (quantity > maxStock) {
      toast.error(`حداکثر تعداد قابل سفارش ${maxStock} عدد می‌باشد.`);
      return;
    }

    dispatch(addToCart(product.id, selectedVariantId, quantity));
  };

  const getVariantLabel = (variant) => {
    return variant.attributes
      .map(attr => `${attr.attribute.name}: ${attr.value}`)
      .join(' - ');
  };

  const brandName = product.brand?.name || product.brand || 'نامشخص';

  return (
    <div className={styles.productInfo}>
      {product.is_new && (
        <img src={newImg} className={styles.newBadge} alt="محصول جدید" />
      )}
      <h1 className={styles.productTitle}>{product.name}</h1>
      <p className={styles.productSku}>کد محصول: {currentSku}</p>

      <div className={styles.priceSection}>
        <span className={styles.price}>{formatPrice(currentPrice)} تومان</span>
      </div>

      <div className={styles.stockStatus}>
        {currentStock > 0 ? (
          <span className={styles.inStock}>موجود در انبار ({currentStock} عدد)</span>
        ) : (
          <span className={styles.outOfStock}>ناموجود</span>
        )}
      </div>

      {isVariable && (
        <div className={styles.variantSelector}>
          <Form.Group controlId="variantSelect">
            <Form.Label>انتخاب گزینه:</Form.Label>
            <Form.Select
              onChange={handleVariantChange}
              value={selectedVariantId || ''}
              className={styles.variantSelect}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {getVariantLabel(variant)} 
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      )}

      {currentStock > 0 && (
        <div className={styles.addToCartSection}>
          <div className={styles.quantityControl}>
            <label htmlFor="quantity">تعداد:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={currentStock}
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
          </div>
          <Button
            variant="primary"
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            disabled={isVariable && !selectedVariantId}
          >
            <FaShoppingCart /> افزودن به سبد خرید
          </Button>
        </div>
      )}

      <div className={styles.metaInfo}>
        <p>
          <span className={styles.metaLabel}>برند:</span> {brandName}
        </p>
        {product.categories?.length > 0 && (
          <p>
            <span className={styles.metaLabel}>دسته‌بندی:</span>{' '}
            {product.categories.map(cat => cat.name).join('، ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;