import { useState } from "react";

import type {
  ProductImage,
} from "../../types/product";

import styles from "./ProductGallery.module.scss";

interface Props {
  images: ProductImage[];
}

function ProductGallery({
  images,
}: Props) {
  const [
    selectedImage,
    setSelectedImage,
  ] = useState(images[0]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={selectedImage.url}
          alt=""
        />
      </div>

      <div className={styles.thumbnails}>
        {images.map((image) => (
          <button
            key={image.id}
            className={`${styles.thumbnail} ${
              selectedImage.id === image.id
                ? styles.active
                : ""
            }`}
            onClick={() =>
              setSelectedImage(image)
            }
          >
            <img
              src={image.url}
              alt=""
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;