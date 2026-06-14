import styles from "./QuantityPicker.module.scss";

interface Props {
  quantity: number;

  maxQuantity: number;

  onChange: (
    quantity: number
  ) => void;
}

function QuantityPicker({
  quantity,
  maxQuantity,
  onChange,
}: Props) {
  const decrease = () => {
    if (quantity <= 1) return;

    onChange(quantity - 1);
  };

  const increase = () => {
    if (
      quantity >= maxQuantity
    )
      return;

    onChange(quantity + 1);
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={decrease}
        disabled={quantity <= 1}
      >
        −
      </button>

      <span>{quantity}</span>

      <button
        onClick={increase}
        disabled={
          quantity >= maxQuantity
        }
      >
        +
      </button>
    </div>
  );
}

export default QuantityPicker;