"use client";

import { CATEGORIES } from "@/constants";
import { useGlobalContext } from "@/context";
import Link from "next/link";
import styles from "./navigation.module.sass";

const Navigation = () => {
  const { categories, activeCategory } = useGlobalContext();

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link
            href="/"
            className={!activeCategory ? styles.link__active : styles.link}
          >
            Show All
          </Link>
        </li>

        {categories.map((category: string) => (
          <li key={category}>
            <Link
              href={`/?filter=${category}`}
              className={
                activeCategory === category ? styles.link__active : styles.link
              }
            >
              {CATEGORIES[category]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
