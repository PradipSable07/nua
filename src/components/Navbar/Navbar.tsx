import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
} from "react-icons/fi";

import { useCart } from "../../hooks/useCart";

import styles from "./Navbar.module.scss";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={styles.mobileMenu}
        >
          <FiMenu />
        </button>

        <Link
          to="/"
          className={styles.logo}
        >
          NUA
        </Link>

        <nav className={styles.navigation}>
          <Link to="/">
            Shop
          </Link>

          <Link to="/">
            Categories
          </Link>

          <Link to="/">
            New Arrivals
          </Link>
        </nav>

        <button
          className={styles.cartButton}
        >
          <FiShoppingCart />

          {totalItems > 0 && (
            <span
              className={styles.badge}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;