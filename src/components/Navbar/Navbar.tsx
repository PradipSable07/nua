import { useCart } from "../../hooks/useCart";

import styles from "./Navbar.module.scss";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        NUA Store
      </div>

      <button
        className={styles.cartButton}
      >
        Cart

        {totalItems > 0 && (
          <span
            className={styles.badge}
          >
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
}

export default Navbar;