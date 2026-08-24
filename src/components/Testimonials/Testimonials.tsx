"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    quote:
      '"Atelier Luxe transformed our home into a sanctuary. Their attention to detail and understanding of our lifestyle was exceptional."',
    name: "Victoria Ashford",
    role: "Private Client, New York",
    avatar: "/images/avatar-victoria.jpg",
  },
  {
    quote:
      '"The custom furniture pieces are beyond our expectations. True artistry combined with functionality and comfort."',
    name: "James Thornton",
    role: "CEO, Thornton Holdings",
    avatar: "/images/avatar-james.jpg",
  },
  {
    quote:
      '"Working with their design team was a revelation. They captured our vision perfectly and exceeded every expectation."',
    name: "Sofia Martinez",
    role: "Interior Designer",
    avatar: "/images/avatar-sofia.jpg",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(1);

  const go = (delta: number) =>
    setIndex(
      (current) =>
        (current + delta + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">Client Experiences</p>
          <h2 className={`sectionTitle ${styles.title}`}>What They Say</h2>
        </div>

        <div className={styles.carousel}>
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ "--index": index } as React.CSSProperties}
            >
              {TESTIMONIALS.map(({ quote, name, role, avatar }) => (
                <div key={name} className={styles.slide}>
                  <figure className={styles.card}>
                    <Image
                      src="/images/icon-quote.svg"
                      alt=""
                      width={40}
                      height={40}
                      className={styles.quoteIcon}
                    />
                    <blockquote className={styles.quote}>{quote}</blockquote>
                    <figcaption className={styles.person}>
                      <Image
                        src={avatar}
                        alt={name}
                        width={56}
                        height={56}
                        className={styles.avatar}
                      />
                      <div>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.role}>{role}</p>
                      </div>
                      <div className={styles.stars}>
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Image
                            key={starIndex}
                            src="/images/icon-star.svg"
                            alt=""
                            width={20}
                            height={20}
                            className={styles.star}
                          />
                        ))}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <Image
                src="/images/icon-chevron-left.svg"
                alt=""
                width={20}
                height={20}
                className={styles.controlIcon}
              />
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              <Image
                src="/images/icon-chevron-right.svg"
                alt=""
                width={20}
                height={20}
                className={styles.controlIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
