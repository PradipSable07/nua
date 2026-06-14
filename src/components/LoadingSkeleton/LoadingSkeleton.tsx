import styles from "./LoadingSkeleton.module.scss";

interface Props {
  count?: number;
}

function LoadingSkeleton({
  count = 8,
}: Props) {
  return (
    <div className={styles.grid}>
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className={styles.card}
        >
          <div
            className={styles.image}
          />

          <div
            className={styles.brand}
          />

          <div
            className={styles.title}
          />

          <div
            className={styles.price}
          />

          <div
            className={styles.button}
          />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;