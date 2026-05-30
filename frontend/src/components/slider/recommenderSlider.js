import React, { useRef } from "react";
import styles from "../../assets/css/RecommenderSlider.module.css";
import ProductCardComponent from "../cards/productCard";

const RecommenderSlider = ({ products, title }) => {
  const sliderRef = useRef();

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const amount = slider.clientWidth * 0.85;
    slider.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>
        <hr className={styles.line} />
        <h2 className={styles.title}>{title}</h2>
        <hr className={styles.line} />
      </div>

      <div className={styles.sliderContainer}>
        
        <button className={styles.btnPrev} onClick={() => scroll("left")}>
          ◀
        </button>

        <div className={styles.slider} ref={sliderRef}>
          {products.map((p, index) => (
            <div key={p.id} className={`${styles.cardWrapper} ${styles.fadeIn}`}>
              <ProductCardComponent product={p} />
            </div>
          ))}
        </div>

        <button className={styles.btnNext} onClick={() => scroll("right")}>
          ▶
        </button>

      </div>
    </div>
  );
};

export default RecommenderSlider;
