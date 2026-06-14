import { FiPackage } from "react-icons/fi";

import styles from "./EmptyState.module.scss";

interface Props {
  title: string;
  description: string;
}

function EmptyState({
  title,
  description,
}: Props) {
  return (
    <section className={styles.empty}>
      <FiPackage
        className={styles.icon}
      />

      <h2>{title}</h2>

      <p>{description}</p>
    </section>
  );
}

export default EmptyState;