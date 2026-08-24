import Image from "next/image";
import styles from "./TradeShows.module.css";

const EVENTS = [
  {
    code: "IGA",
    name: "Indian Gaming Association",
    date: "March 30 – April 2, 2026",
    location: "San Diego, CA",
    image: "/images/event-san-diego.jpg",
    alt: "San Diego Convention Center at golden hour",
  },
  {
    code: "HD",
    name: "HD Expo + Conference",
    date: "May 5 – May 7, 2026",
    location: "Mandalay Bay, Las Vegas",
    image: "/images/event-mandalay-bay.jpg",
    alt: "Mandalay Bay Resort in Las Vegas at dusk",
  },
];

export default function TradeShows() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className="sectionTitle">Upcoming Trade Shows</h2>
          <p className={styles.intro}>
            Meet the studio and experience our latest collections in person at
            these premier industry events.
          </p>
        </div>

        <div className={styles.grid}>
          {EVENTS.map(({ code, name, date, location, image, alt }) => (
            <article key={code} className={styles.card}>
              <Image
                src={image}
                alt={alt}
                width={624}
                height={468}
                sizes="(max-width: 1023px) 100vw, 45vw"
                className={styles.image}
              />
              <span className={styles.scrim} aria-hidden />

              <div className={styles.panelWrap}>
                <div className={styles.panel}>
                  <div className={styles.panelRow}>
                    <div>
                      <p className={styles.kicker}>Upcoming Event</p>
                      <div className={styles.codeRow}>
                        <p className={styles.code}>{code}</p>
                        <span className={styles.codeRule} aria-hidden />
                      </div>
                      <h3 className={styles.eventName}>{name}</h3>
                      <div className={styles.meta}>
                        <p className={styles.metaLine}>
                          Date:<span className={styles.metaValue}> {date}</span>
                        </p>
                        <p className={styles.metaLine}>
                          Location:
                          <span className={styles.metaValue}> {location}</span>
                        </p>
                      </div>
                    </div>

                    <a href="#" className={styles.detailsButton}>
                      View Details
                      <Image
                        src="/images/icon-arrow-up-right.svg"
                        alt=""
                        width={20}
                        height={20}
                        className={styles.detailsIcon}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
