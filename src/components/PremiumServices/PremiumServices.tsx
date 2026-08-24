import Image from "next/image";
import styles from "./PremiumServices.module.css";

const SERVICES = [
  {
    icon: "/images/icon-compass.svg",
    title: "Interior Design",
    body: "Bespoke design solutions tailored to your lifestyle, creating harmonious spaces that reflect your unique vision.",
  },
  {
    icon: "/images/icon-palette.svg",
    title: "Furniture Curation",
    body: "Access to exclusive collections and custom pieces sourced from master craftsmen across Europe.",
  },
  {
    icon: "/images/icon-hammer.svg",
    title: "Custom Manufacturing",
    body: "Handcrafted furniture made to your exact specifications using premium materials and time-honored techniques.",
  },
];

export default function PremiumServices() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">Our Expertise</p>
          <h2 className={`sectionTitle ${styles.title}`}>Premium Services</h2>
        </div>

        <div className={styles.grid}>
          {SERVICES.map(({ icon, title, body }) => (
            <article key={title} className={styles.card}>
              <div>
                <Image
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                  className={styles.icon}
                />
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
              </div>
              <a href="#" className={styles.learnMore}>
                Learn more
                <Image
                  src="/images/icon-arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className={styles.learnMoreIcon}
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
