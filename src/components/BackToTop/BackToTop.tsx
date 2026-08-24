"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once the reader is well past the hero and heading for the footer.
      setVisible(window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <button
      type="button"
      onClick={toTop}
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <Image
        src="/images/icon-arrow-up-right.svg"
        alt=""
        width={20}
        height={20}
        className={styles.icon}
      />
    </button>
  );
}
