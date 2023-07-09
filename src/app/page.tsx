"use client";

import styles from "./page.module.sass";
import Navigation from "@/components/navigation";
import ArticleList from "@/components/article-list";
import { useGlobalContext } from "@/context";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Article, { IArticle } from "@/components/article";
import SearchInput from "@/components/search-input";
import Fuse from "fuse.js";
import { confirmAlert } from "react-confirm-alert";
import debounce from "lodash.debounce";
import "react-confirm-alert/src/react-confirm-alert.css";

const filterArticlesByCategory = (
  articles: IArticle[],
  category: string | null,
) => {
  if (!category) return articles;

  return articles.filter(
    (article: IArticle) => article.post_category_id === category,
  );
};

const Home: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("filter");
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("q") || "",
  );
  const { articles, setActiveCategory } = useGlobalContext();
  const [filteredArticles, setFilteredArticles] = useState<IArticle[]>(
    filterArticlesByCategory(articles, category),
  );

  React.useEffect(() => {
    if (!searchTerm || searchTerm.length < 3) {
      setFilteredArticles(filterArticlesByCategory(articles, category));
    } else {
      const filteredArticles = new Fuse(
        filterArticlesByCategory(articles, category),
        { keys: ["title", "excerpt"] },
      );

      setFilteredArticles(
        filteredArticles.search(searchTerm as string).map(({ item }) => item),
      );
    }
  }, [articles, category, searchTerm]);

  React.useEffect(() => {
    setActiveCategory(category || "");
  }, [category, setActiveCategory]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    debounce(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("q", value);
      window.history.pushState({}, "", url.toString());
    }, 750)();
  };

  const handleDelete = (slug: string) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom-ui">
          <h1>Delete article</h1>
          <p className={styles.delete__paragraph}>
            Are you sure you want to delete this article?
          </p>
          <button
            className={styles.button__delete}
            onClick={() => {
              setFilteredArticles((articles) =>
                articles.filter((article) => article.slug !== slug),
              );
              onClose();
            }}
          >
            Yes, delete it!
          </button>
          <button onClick={onClose} className={styles.button}>
            No, take me back!
          </button>
        </div>
      ),
    });
  };

  return (
    <main className={styles.main}>
      <Navigation />
      <SearchInput value={searchTerm} onChange={handleSearch} />
      <ArticleList>
        {filteredArticles.map((article: IArticle) => (
          <Article {...article} onDelete={handleDelete} key={article.slug} />
        ))}
      </ArticleList>
    </main>
  );
};

export default Home;
