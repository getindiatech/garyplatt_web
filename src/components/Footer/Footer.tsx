import Image from "next/image";
import styles from "./Footer.module.css";

const PRODUCT_LINKS = [
  "Gaming Seating",
  "Hospitality Seating",
  "Sustainability",
  "Projects",
  "Gallery",
];

const COMPANY_LINKS = [
  "About us",
  "Our Story",
  "News & Events",
  "Careers",
  "Contact Us",
];

const SOCIALS = ["Instagram", "Twitter", "Facebook", "Linkedin"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={`${styles.cell} ${styles.cellPitch}`}>
            <p className={styles.pitchTitle}>Experience Exceptional Comfort</p>
            <p className={styles.pitchBody}>
              Explore premium gaming and hospitality seating designed with
              unmatched craftsmanship, innovative engineering, and timeless
              comfort.
            </p>
            <a href="#" className={styles.pitchButton}>
              Explore Collection
              <Image
                src="/images/icon-arrow-up-right-dark.svg"
                alt=""
                width={20}
                height={20}
                className={styles.pitchButtonIcon}
              />
            </a>
          </div>

          <div className={`${styles.cell} ${styles.cellChair}`}>
            <div className={styles.chairWrap}>
              <Image
                src="/images/footer-gold-chair.png"
                alt="Luxury gold gaming chair"
                width={206}
                height={332}
                className={styles.chairImage}
              />
              <Image
                src="/images/footer-chair-ellipse.svg"
                alt=""
                width={249}
                height={64}
                className={styles.chairEllipse}
                aria-hidden
              />
            </div>
          </div>

          <div className={`${styles.cell} ${styles.cellLinks}`}>
            <div className={styles.linkColumns}>
              <div className={styles.linkColumn}>
                <p className={styles.linkHeading}>Products</p>
                <nav className={styles.linkList}>
                  {PRODUCT_LINKS.map((label) => (
                    <a key={label} href="#">
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className={styles.linkColumn}>
                <p className={styles.linkHeading}>Company</p>
                <nav className={styles.linkList}>
                  {COMPANY_LINKS.map((label) => (
                    <a key={label} href="#">
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop socials strip */}
        <div className={styles.socialRow}>
          <div className={styles.socialLabelCell}>
            <p className={styles.socialLabel}>Also available on socials :</p>
          </div>
          {SOCIALS.map((name) => (
            <div key={name} className={styles.socialCell}>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialName}>{name}</span>
                <span className={styles.socialCircle}>
                  <Image
                    src="/images/icon-social-arrow.svg"
                    alt=""
                    width={16}
                    height={16}
                    className={styles.socialIcon}
                  />
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Mobile socials strip */}
        <div className={styles.mobileSocialRow}>
          <p className={styles.mobileSocialLabel}>Also available on socials :</p>
          <div className={styles.mobileSocialIcons}>
            {SOCIALS.map((name) => (
              <a
                key={name}
                href="#"
                className={styles.socialCircle}
                aria-label={name}
              >
                <Image
                  src="/images/icon-social-arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className={styles.socialIcon}
                />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.wordmark} aria-hidden>
            <span>GARY</span>
            <span>PLATT</span>
          </p>

          <div className={styles.legal}>
            <div className={styles.legalLinks}>
              <a href="#">Privacy Policy</a>
              <span className={styles.legalDivider} aria-hidden />
              <a href="#">Disclaimer</a>
            </div>
            <span className={styles.legalDivider} aria-hidden />
            <p>© 2026 Gray Platte Seating</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
