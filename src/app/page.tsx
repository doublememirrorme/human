"use client";

import styles from "./page.module.css";
import Navigation from "@/components/navigation";
import ArticleList from "@/components/article-list";
import { useGlobalContext } from "@/context";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Article, { IArticle } from "@/components/article";
import SearchInput from "@/components/search-input";

const Home: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("filter");
  const [searchTerm, setSearchTerm] = useState<string | null>(
    searchParams.get("q"),
  );
  const { articles, setActiveCategory } = useGlobalContext();
  const [filteredArticles, setFilteredArticles] = useState<IArticle[]>(
    !category
      ? articles
      : articles.filter(
          (article: IArticle) => article.post_category_id === category,
        ),
  );

  React.useEffect(() => {
    const filteredArticles = !category
      ? articles
      : articles.filter(
          (article: IArticle) => article.post_category_id === category,
        );

    setFilteredArticles(
      searchTerm
        ? filteredArticles.filter(
            (article: IArticle) =>
              article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : filteredArticles,
    );
  }, [articles, category, searchTerm]);

  React.useEffect(() => {
    setActiveCategory(category || "");
  }, [category, setActiveCategory]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const url = new URL(window.location.href);
    url.searchParams.set("q", value);
    setSearchTerm(value);
    window.history.pushState({}, "", url.toString());
  };

  const handleDelete = (slug: string) => {
    setFilteredArticles((articles) =>
      articles.filter((article) => article.slug !== slug),
    );
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
