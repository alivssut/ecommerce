import React, { useState } from "react";
import styles from "../../assets/css/CategoryTab.module.css";
import ProductCardComponent from "../cards/productCard";
import tabsImg from "../../assets/images/home/Tabs.png";

const CategoryTab = () => {
  const [active, setActive] = useState(0);

  const tabs = [
    "گـروه محصولات 1",
    "گـروه محصولات 2",
    "گـروه محصولات 3",
    "گـروه محصولات 4",
    "گـروه محصولات 5",
  ];

  const renderProducts = () => (
    <div className={styles.products}>
      {[...Array(4)].map((_, index) => (
        <ProductCardComponent
          key={index}
          product={{ name: "a", price: 12224, image: tabsImg }}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {tabs.map((t, i) => (
          <button
            key={i}
            className={`${styles.tab} ${active === i ? styles.active : ""}`}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.content} key={active}>
        {renderProducts()}
      </div>
    </div>
  );
};

export default CategoryTab;
