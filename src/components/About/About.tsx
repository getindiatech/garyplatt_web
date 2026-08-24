import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.visual}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/about-living-space.jpg"
                alt="Luxury living space with a designer swivel chair"
                width={872}
                height={1090}
                sizes="(max-width: 1023px) 100vw, 45vw"
                className={styles.image}
              />
            </div>
            <span className={styles.accentSquare} aria-hidden />
            <div className={styles.badge}>
              <p className={styles.badgeValue}>38</p>
              <p className={styles.badgeLabel}>
                Years of
                <br />
                Excellence
              </p>
            </div>
            <div className={styles.mobileBadge}>
              <p className={styles.badgeValue}>38</p>
              <p className={styles.badgeLabel}>Years of Excellence</p>
            </div>
          </div>

          <div className={styles.copy}>
            <div className={styles.head}>
              <p className="eyebrow">About Atelier Luxe</p>
              <h2 className={styles.title}>
                Crafting Timeless
                <span className={styles.titleAccent}>Elegance</span>
              </h2>
            </div>

            <p className={styles.paragraph}>
              Founded in 1985, Atelier Luxe has established itself as a premier
              destination for discerning clients seeking exceptional interior
              design and bespoke furniture. Our philosophy centers on the belief
              that true luxury lies in the details — the perfect proportions, the
              finest materials, and the masterful execution.
            </p>
            <p className={`${styles.paragraph} ${styles.paragraphExtra}`}>
              Each project we undertake is a collaborative journey, where your
              vision meets our expertise to create spaces that are not just
              beautiful, but deeply personal and timeless.
            </p>

            <div className={styles.stats}>
              <div className={styles.statFirst}>
                <p className={styles.statValue}>38+</p>
                <p className={styles.statLabel}>Years of Excellence</p>
              </div>
              <div className={styles.statPair}>
                <div>
                  <p className={styles.statValue}>2,500+</p>
                  <p className={styles.statLabel}>Projects Completed</p>
                </div>
                <div>
                  <p className={styles.statValue}>95%</p>
                  <p className={styles.statLabel}>Client Satisfaction</p>
                </div>
              </div>
            </div>

            <a href="#" className={styles.cta}>
              Discover Our Story
              <Image
                src="/images/icon-arrow-right-light.svg"
                alt=""
                width={16}
                height={16}
                className={styles.ctaIcon}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
