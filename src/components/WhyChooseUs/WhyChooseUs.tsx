import Image from "next/image";
import styles from "./WhyChooseUs.module.css";

const REASONS = [
  {
    icon: "/images/icon-hammer.svg",
    title: "Master Craftsmanship",
    body: "Every piece handcrafted by skilled artisans using time-honored techniques.",
  },
  {
    icon: "/images/icon-palette.svg",
    title: "Bespoke Design",
    body: "Fully customized solutions tailored to your unique vision and requirements.",
  },
  {
    icon: "/images/icon-heart.svg",
    title: "Sustainable Practices",
    body: "Ethically sourced materials and environmentally conscious production methods.",
  },
  {
    icon: "/images/icon-compass.svg",
    title: "Expert Consultation",
    body: "Personalized guidance from initial concept to final installation.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">The Atelier Difference</p>
          <h2 className={`sectionTitle ${styles.title}`}>Why Choose Us</h2>
        </div>

        <div className={styles.grid}>
          {REASONS.map(({ icon, title, body }) => (
            <article key={title} className={styles.item}>
              <div className={styles.iconBox}>
                <Image
                  src={icon}
                  alt=""
                  width={32}
                  height={32}
                  className={styles.icon}
                />
              </div>
              <h3 className={styles.itemTitle}>{title}</h3>
              <p className={styles.itemBody}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
