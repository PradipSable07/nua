import type {
  ProductVariant,
} from "../../types/product";

import { getStockStatus } from "../../utils/stock";

import styles from "./VariantSelector.module.scss";

interface Props {
  variants: ProductVariant[];

  selectedColor: string;

  selectedSize: string;

  onColorChange: (
    color: string
  ) => void;

  onSizeChange: (
    size: string
  ) => void;
}

function VariantSelector({
  variants,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: Props) {
  const colors = [
    ...new Set(
      variants.map(
        (variant) => variant.color
      )
    ),
  ];

  const sizes = [
    ...new Set(
      variants.map(
        (variant) => variant.size
      )
    ),
  ];

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>Color</h3>

        <div className={styles.colors}>
          {colors.map((color) => (
            <button
              key={color}
              className={`${styles.colorButton} ${
                selectedColor === color
                  ? styles.active
                  : ""
              }`}
              onClick={() =>
                onColorChange(color)
              }
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Size</h3>

        <div className={styles.sizes}>
          {sizes.map((size) => {
            const variant =
              variants.find(
                (v) =>
                  v.color ===
                    selectedColor &&
                  v.size === size
              );

            const status =
              getStockStatus(
                variant?.stock ?? 0
              );

            return (
              <button
                key={size}
                disabled={
                  status ===
                  "sold-out"
                }
                className={`
                  ${styles.sizeButton}
                  ${
                    selectedSize ===
                    size
                      ? styles.active
                      : ""
                  }
                  ${
                    status ===
                    "sold-out"
                      ? styles.soldOut
                      : ""
                  }
                `}
                onClick={() =>
                  onSizeChange(size)
                }
              >
                {size}

                {status ===
                  "low-stock" && (
                  <span>
                    Low Stock
                  </span>
                )}

                {status ===
                  "sold-out" && (
                  <span>
                    Sold Out
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VariantSelector;