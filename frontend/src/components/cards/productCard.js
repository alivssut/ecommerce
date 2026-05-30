import React, { useState } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/ProductCard.module.css";
import fallbackImg from "../../assets/images/fallback.jpg";

const LimitedText = ({ text, limit }) => {
  const t = text.length > limit ? text.slice(0, limit) + "..." : text;
  return <p className={styles.title}>{t}</p>;
};

const ProductCard = ({ product }) => {
  const nav = useNavigate();
  const [imgSrc, setImgSrc] = useState(product.image);

  const formatPrice = (p) =>
    parseInt(p.toString().replace(/\D/g, "")).toLocaleString();

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          src={imgSrc || fallbackImg}
          alt={product.name}
          onError={() => setImgSrc(fallbackImg)}
        />
      </div>

      <h2 className={styles.price}>{formatPrice(product.price)} تومان</h2>

      <LimitedText text={product.name} limit={20} />

      <div className={styles.actions}>
        <button
          className={styles.btn}
          onClick={() => nav(`/products/${product.slug}`)}
        >
          <FaEye /> مشاهده
        </button>

        <button className={styles.btnWishlist}>
          <FaHeart /> علاقه‌مندی
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
