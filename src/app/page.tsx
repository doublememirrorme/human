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
import "react-confirm-alert/src/react-confirm-alert.css";

const filterArticlesByCategory = (
  articles: IArticle[],
  category: string | null,
  filteredCategories: string[] = [],
) =>
  (!category
    ? articles
    : articles.filter(
        (article: IArticle) => article.post_category_id === category,
      )
  ).filter((article) => !filteredCategories.includes(article.post_category_id));

const Home: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("filter");
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") || "",
  );
  const {
    articles,
    setActiveCategory,
    deletedArticles,
    setDeletedArticles,
    setFilteredCategories,
    filteredCategories,
  } = useGlobalContext();
  const [filteredArticles, setFilteredArticles] = useState<IArticle[]>(
    filterArticlesByCategory(articles, category, filteredCategories),
  );

  React.useEffect(() => {
    if (!searchTerm || searchTerm.length < 3) {
      setFilteredArticles(
        filterArticlesByCategory(articles, category, filteredCategories),
      );
    } else {
      const filteredArticles = new Fuse(
        filterArticlesByCategory(articles, category, filteredCategories),
        { keys: ["title", "excerpt"] },
      );

      setFilteredArticles(
        filteredArticles.search(searchTerm as string).map(({ item }) => item),
      );
    }
  }, [articles, category, searchTerm, filteredCategories]);

  React.useEffect(() => {
    setActiveCategory(category || "");
  }, [category, setActiveCategory]);

  const updateURL = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("query", value);
    window.history.pushState({}, "", url.toString());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    updateURL(value);
  };

  const handleRefetch = () => {
    setFilteredArticles(filterArticlesByCategory(articles, category));
    setDeletedArticles([]);
    setFilteredCategories([])
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
              const articlesToDelete: IArticle[] = [];

              setFilteredArticles((articles) =>
                articles.filter((article) => {
                  const result = article.slug !== slug;
                  if (result) articlesToDelete.push(article);

                  return result;
                }),
              );

              setDeletedArticles(articlesToDelete);
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

      {!category && deletedArticles.length ? (
        <button className={styles.button__refetch} onClick={handleRefetch}>
          Refetch
        </button>
      ) : null}
    </main>
  );
};

export default Home;
