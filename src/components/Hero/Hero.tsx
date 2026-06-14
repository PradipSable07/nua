import styles from "./Hero.module.scss";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <span className={styles.tag}>
            NEW COLLECTION 2026
          </span>

          <h1 className={styles.title}>
            Elevate Your Everyday Style
          </h1>

          <p className={styles.description}>
            Discover premium products crafted
            for modern lifestyles. Quality,
            comfort, and elegance in one place.
          </p>

          <button className={styles.cta}>
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;