"use client";

import { CATEGORIES } from "@/constants";
import { useGlobalContext } from "@/context";
import styles from "./category-filter.module.sass";
import { ChangeEvent, useState } from "react";

const CategoryFilter = () => {
  const { categories, filteredCategories, setFilteredCategories } =
    useGlobalContext();
  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    const result = filteredCategories.includes(value)
      ? filteredCategories.filter((category) => category !== value)
      : [...filteredCategories, value];

    setFilteredCategories(result);
  };

  return (
    <div className={styles.filter__wrapper}>
      <button
        className={styles.button__toggle}
        onClick={() => setVisible(!visible)}
      >
        Toggle category filter
      </button>

      <div className={styles.filter} hidden={!visible}>
        {categories.map((category, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={category}
              className={styles.checkbox}
              onChange={handleChange}
              checked={filteredCategories.includes(category)}
            />

            {CATEGORIES[category]}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
