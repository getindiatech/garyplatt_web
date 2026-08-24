import Image from "next/image";
import styles from "./Philosophy.module.css";

const PRINCIPLES = [
  {
    title: "Form",
    body: "Beautifully engineered forms that combine timeless aesthetics with ergonomic excellence.",
    image: "/images/principle-form.jpg",
    alt: "Aniline hide lounge chair close-up",
  },
  {
    title: "Fit",
    body: "Designed for exceptional comfort, providing superior support during extended seating experiences.",
    image: "/images/principle-fit.jpg",
    alt: "Cast bronze tufted upholstery close-up",
  },
  {
    title: "Function",
    body: "Expertly handcrafted using premium materials with meticulous attention to every detail.",
    image: "/images/principle-function.jpg",
    alt: "Artisan hand-stitching a wool bouclé seat",
  },
  {
    title: "PERFORMANCE",
    body: "Built for durability, reliability, and long-term performance in demanding gaming and hospitality ",
    image: "/images/principle-performance.jpg",
    alt: "Casino floor lined with gaming chairs under chandeliers",
  },
];

export default function Philosophy() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Our Philosophy</p>

        <div className={styles.head}>
          <h2 className={styles.title}>Built on Four Principles</h2>
          <p className={styles.intro}>
            Every Gary Platt chair is thoughtfully designed around four core
            principles that define exceptional seating.
          </p>
        </div>

        <div className={styles.grid}>
          {PRINCIPLES.map(({ title, body, image, alt }) => (
            <article key={title} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={image}
                  alt={alt}
                  width={416}
                  height={520}
                  sizes="(max-width: 767px) 45vw, (max-width: 1279px) 45vw, 22vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.cardTitleWrap}>
                <h3 className={styles.cardTitle}>{title}</h3>
              </div>
              <p className={styles.cardBody}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
