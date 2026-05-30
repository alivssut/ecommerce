import React, { useState } from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import styles from './ProductImageGallery.module.css';

const ProductImageGallery = ({ images, mainImage }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(mainImage);

  const handleShow = (img) => {
    setCurrentImage(img);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  // گروه‌بندی تصاویر برای کاروسل (سه‌تایی)
  const groupImages = (imgs) => {
    const grouped = [];
    for (let i = 0; i < imgs.length; i += 3) {
      grouped.push(imgs.slice(i, i + 3));
    }
    return grouped;
  };

  const imageGroups = groupImages(images);

  return (
    <>
      <div className={styles.mainImageContainer}>
        <img
          src={mainImage}
          alt="تصویر اصلی محصول"
          className={styles.mainImage}
          onClick={() => handleShow(mainImage)}
        />
        <Button
          variant="light"
          className={styles.zoomButton}
          onClick={() => handleShow(mainImage)}
        >
          <FaSearchPlus /> بزرگنمایی
        </Button>
      </div>

      {imageGroups.length > 0 && (
        <Carousel
          indicators={false}
          className={styles.thumbnailCarousel}
          prevIcon={<span className={styles.carouselControl}>&#10094;</span>}
          nextIcon={<span className={styles.carouselControl}>&#10095;</span>}
        >
          {imageGroups.map((group, idx) => (
            <Carousel.Item key={idx}>
              <div className={styles.thumbnailGroup}>
                {group.map((img, i) => (
                  <img
                    key={i}
                    src={img.image || img}
                    alt={`تصویر ${idx * 3 + i + 1}`}
                    className={styles.thumbnail}
                    onClick={() => handleShow(img.image || img)}
                  />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Body className={styles.modalBody}>
          <img src={currentImage} alt="بزرگنمایی محصول" className={styles.modalImage} />
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="outline-secondary" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductImageGallery;