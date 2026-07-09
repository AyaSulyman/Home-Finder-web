import React from "react";
import styles from "./Gallery.module.scss";
import HouseIllustration from "../shared/HouseIllustration";

interface GalleryProps {
  extraPhotosCount?: number;
}

const Gallery: React.FC<GalleryProps> = ({ extraPhotosCount = 12 }) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.galleryMain}>
        <HouseIllustration variant="hero" />
      </div>
      <div className={styles.galleryGrid}>
        <div className={styles.galleryThumb}>
          <HouseIllustration variant="thumb" />
        </div>
        <div className={styles.galleryThumb}>
          <HouseIllustration variant="thumb" />
        </div>
        <div className={styles.galleryThumb}>
          <HouseIllustration variant="thumb" />
        </div>
        <div className={styles.galleryThumb}>
          <HouseIllustration variant="thumb" darken />
          <div className={styles.galleryOverlay}>+{extraPhotosCount} photos</div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
