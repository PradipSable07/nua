import type { ProductVariant } from "../../types/product";
import { getStockStatus } from "../../utils/stock";
import styles from "./VariantSelector.module.scss";

interface Props {
  variants: ProductVariant[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

function VariantSelector({
  variants,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: Props) {
  // isCartOpen unique colors
  const colors = [...new Set(variants.map((v) => v.color))];

  // isCartOpen unique sizes
  const sizes = [...new Set(variants.map((v) => v.size))];

  //  fast lookup map: color + size => variant
  const variantMap = new Map<string, ProductVariant>();

  variants.forEach((v) => {
    variantMap.set(`${v.color}-${v.size}`, v);
  });

  // get variant helper
  const getVariant = (color: string, size: string) =>
    variantMap.get(`${color}-${size}`);

  return (
    <div className={styles.container}>
      {/* COLOR SECTION */}
      <div className={styles.section}>
        <h3>Color</h3>

        <div className={styles.colors}>
          {colors.map((color) => {
            // check if any size exists with stock > 0
            const hasStock = sizes.some((size) => {
              const v = getVariant(color, size);
              return v && v.stock > 0;
            });

            return (
              <button
                key={color}
                disabled={!hasStock}
                className={`
                  ${styles.colorButton}
                  ${selectedColor === color ? styles.active : ""}
                  ${!hasStock ? styles.soldOut : ""}
                `}
                onClick={() => onColorChange(color)}
              >
                {color}

                {!hasStock && <span>Sold Out</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE SECTION */}
      <div className={styles.section}>
        <h3>Size</h3>

        <div className={styles.sizes}>
          {sizes.map((size) => {
            const variant = getVariant(selectedColor, size);

            const stock = variant?.stock ?? 0;
            const status = getStockStatus(stock);

            const isDisabled = status === "sold-out";

            return (
              <button
                key={size}
                disabled={isDisabled}
                className={`
                  ${styles.sizeButton}
                  ${selectedSize === size ? styles.active : ""}
                  ${isDisabled ? styles.soldOut : ""}
                `}
                onClick={() => onSizeChange(size)}
              >
                {size}

                {status === "low-stock" && (
                  <span>Low Stock</span>
                )}

                {status === "sold-out" && (
                  <span>Sold Out</span>
                )}

                {status === "available" && (
                  <span>{stock} left</span>
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