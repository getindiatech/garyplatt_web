import Image from "next/image";
import styles from "./Hero.module.css";

const SOCIALS = [
  {
    label: "Instagram",
    icon: "/images/icon-instagram.svg",
    iconDark: "/images/icon-instagram-dark.svg",
  },
  {
    label: "Twitter",
    icon: "/images/icon-twitter.svg",
    iconDark: "/images/icon-twitter-dark.svg",
  },
  {
    label: "YouTube",
    icon: "/images/icon-youtube.svg",
    iconDark: "/images/icon-youtube-dark.svg",
  },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <Image
          src="/images/hero-interior.png"
          alt="Luxury interior with a dark modular sofa and brass pendant lights"
          width={1920}
          height={1104}
          sizes="100vw"
          className={styles.mediaImage}
          priority
        />

        {/* Mobile-only framed detail, per the 430 design */}
        <div className={styles.mobileFrame}>
          <div className={styles.mobileFrameInner}>
            <div className={styles.frameCrop}>
              <Image
                src="/images/hero-interior.png"
                alt=""
                width={301}
                height={165}
                className={styles.frameImage}
                aria-hidden
              />
            </div>
          </div>
          <span className={styles.mobileFrameSquare} aria-hidden />
        </div>
      </div>

      <p className={styles.bigNumber} aria-hidden>
        01
      </p>

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Est. 1985</p>
          <h1 className={styles.title}>
            Elevate Your
            <span className={styles.titleAccent}>Living Space</span>
          </h1>
          <p className={styles.lead}>
            Where European craftsmanship meets contemporary design. We curate
            exceptional interiors that tell your unique story.
          </p>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.socials}>
          {SOCIALS.map(({ label, icon, iconDark }) => (
            <a key={label} href="#" aria-label={label}>
              {/* light glyphs sit on the dark hero photo, dark ones on the white mobile layout */}
              <Image
                src={icon}
                alt=""
                width={20}
                height={20}
                className={`${styles.socialIcon} ${styles.socialIconLight}`}
              />
              <Image
                src={iconDark}
                alt=""
                width={18}
                height={18}
                className={`${styles.socialIcon} ${styles.socialIconDark}`}
              />
            </a>
          ))}
        </div>

        <a href="#" className={styles.cta}>
          Customize Your Chair
        </a>
      </div>

      {/* Desktop framed detail image */}
      <div className={styles.frame}>
        <div className={styles.frameInner}>
          <div className={styles.frameCrop}>
            <Image
              src="/images/hero-interior.png"
              alt=""
              width={1120}
              height={644}
              className={styles.frameImage}
              aria-hidden
            />
          </div>
        </div>
        <span className={styles.frameSquare} aria-hidden />
      </div>
    </section>
  );
}
