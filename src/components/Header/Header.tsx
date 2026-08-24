"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const NAV_LINKS = [
  "Products",
  "About Us",
  "Resources",
  "Sustainability",
  "Gallery",
  "Contact Us",
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logoLink} aria-label="Gary Platt Seating">
          <Image
            src="/images/logo-light.svg"
            alt="Gary Platt Seating"
            width={132}
            height={42}
            className={`${styles.logo} ${styles.logoLight}`}
            priority
          />
          <Image
            src="/images/logo-dark.svg"
            alt=""
            width={102}
            height={32}
            className={`${styles.logo} ${styles.logoDark}`}
            aria-hidden
          />
        </a>

        <nav className={styles.menu}>
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" className={styles.menuLink}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.searchButton} aria-label="Search">
            <Image
              src="/images/icon-search.svg"
              alt=""
              width={20}
              height={20}
              className={styles.searchIcon}
            />
          </button>
          <a href="#" className={styles.quoteButton}>
            Request a Quote
          </a>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Image
            src="/images/icon-menu.svg"
            alt=""
            width={18}
            height={18}
            className={styles.burgerIcon}
          />
        </button>

        {open && (
          <nav className={styles.mobilePanel}>
            {NAV_LINKS.map((label) => (
              <a key={label} href="#" className={styles.mobilePanelLink}>
                {label}
              </a>
            ))}
            <a href="#" className={styles.mobileQuote}>
              Request a Quote
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
