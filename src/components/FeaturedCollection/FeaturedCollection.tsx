import Image from "next/image";
import styles from "./FeaturedCollection.module.css";

const PRODUCTS = [
  { title: "The Angela Series", image: "/images/product-angela.png" },
  { title: "The Troya Series", image: "/images/product-troya.png" },
  { title: "The Callista Series", image: "/images/product-callista.png" },
  { title: "The Helena Series", image: "/images/product-helena.png" },
];

export default function FeaturedCollection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">Curated Selection</p>
            <h2 className={`sectionTitle ${styles.title}`}>
              Featured Collection
            </h2>
          </div>
          <a href="#" className={styles.viewAll}>
            View All Products
            <Image
              src="/images/icon-arrow-right.svg"
              alt=""
              width={16}
              height={16}
              className={styles.viewAllIcon}
            />
          </a>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map(({ title, image }) => (
            <article key={title} className={styles.card}>
              <div className={styles.cardMedia}>
                <Image
                  src={image}
                  alt={title}
                  width={392}
                  height={392}
                  sizes="(max-width: 767px) 45vw, (max-width: 1279px) 45vw, 23vw"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardFoot}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <a href="#" className={styles.cardButton} aria-label={title}>
                  <Image
                    src="/images/icon-arrow-up-right.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={styles.cardButtonIcon}
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        <a href="#" className={styles.mobileViewAll}>
          View All Products
          <Image
            src="/images/icon-arrow-right.svg"
            alt=""
            width={16}
            height={16}
            className={styles.viewAllIcon}
          />
        </a>
      </div>
    </section>
  );
}
