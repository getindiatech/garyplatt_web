import Image from "next/image";
import styles from "./FeaturedInstallation.module.css";

const PROJECTS = [
  {
    title: "Manhattan Penthouse",
    meta: "Las Vegas · 2023",
    image: "/images/project-manhattan.jpg",
  },
  {
    title: "The Hudson Loft",
    meta: "Las Vegas · 2023",
    image: "/images/project-hudson.jpg",
  },
  {
    title: "Park Avenue Residence",
    meta: "Las Vegas · 2023",
    image: "/images/project-park-avenue.jpg",
  },
  {
    title: "Tribeca Townhouse",
    meta: "Las Vegas · 2023",
    image: "/images/project-tribeca.jpg",
  },
];

export default function FeaturedInstallation() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 className={`sectionTitle ${styles.title}`}>
              Featured Installation
            </h2>
          </div>
          <a href="#" className={styles.viewAll}>
            View All Projects
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
          {PROJECTS.map(({ title, meta, image }) => (
            <a key={title} href="#" className={styles.card}>
              <Image
                src={image}
                alt={title}
                width={896}
                height={672}
                sizes="(max-width: 767px) 45vw, 45vw"
                className={styles.image}
              />
              <span className={styles.scrim} aria-hidden />
              <span className={styles.caption}>
                <span className={styles.cardTitle}>{title}</span>
                <span className={styles.cardMeta}>{meta}</span>
              </span>
            </a>
          ))}
        </div>

        <a href="#" className={styles.mobileViewAll}>
          View All Projects
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
