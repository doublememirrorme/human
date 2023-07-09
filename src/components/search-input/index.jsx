"use client";

import styles from "./search-input.module.sass";

const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search"
    className={styles.search}
    {...{ onChange, value }}
  />
);

export default SearchInput;
