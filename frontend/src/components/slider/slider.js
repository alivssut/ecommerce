import React, { useState } from "react";
import styles from "../../assets/css/Slider.module.css";
import girlImg from "../../assets/images/home/girl2.jpg";

const slides = [
    {
        title: "شاپ سنتر",
        subtitle: "مرکز خرید آنلاین",
        text: "بهترین محصولات با مناسب‌ترین قیمت، ارسال سریع، تضمین بازگشت وجه.",
        img: girlImg,
    },
    {
        title: "شاپ سنتر",
        subtitle: "به روزترین کالاها",
        text: "انواع پوشاک، لوازم دیجیتال، کالای خانه و سبک زندگی.",
        img: girlImg,
    }
];

const Slider = () => {
    const [index, setIndex] = useState(0);

    const prevSlide = () => {
        setIndex((index - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setIndex((index + 1) % slides.length);
    };

    const slide = slides[index];

    return (
        <section className={styles.slider}>
            <div className={styles.container}>

                <div className={styles.slide}>
                    <div className={styles.textBox}>
                        <h1><span>شاپ</span> سنتر</h1>
                        <h2>{slide.subtitle}</h2>
                        <p>{slide.text}</p>
                        <button className={styles.btn}>مشاهده محصولات</button>
                    </div>

                    <div className={styles.imageBox}>
                        <img src={slide.img} className={styles.image} alt="تصویر اسلاید" />
                    </div>
                </div>

                <button onClick={prevSlide} className={`${styles.control} ${styles.left}`}>
                    ❯
                </button>

                <button onClick={nextSlide} className={`${styles.control} ${styles.right}`}>
                    ❮
                </button>

                <div className={styles.indicators}>
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`${styles.dot} ${i === index ? styles.active : ""}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Slider;
