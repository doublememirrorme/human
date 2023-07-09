"use client";

import { createContext, useContext, useState } from "react";
import { IArticle } from "@/components/article";
import React from "react";

interface IGlobalContext {
  articles: IArticle[];
  categories: string[];
  activeCategory: string;
  deletedArticles: IArticle[];
  filteredCategories: string[];
  setFilteredCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setDeletedArticles: React.Dispatch<React.SetStateAction<IArticle[]>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  setArticles: React.Dispatch<React.SetStateAction<IArticle[]>>;
}

const GlobalContext = createContext<IGlobalContext>({
  articles: [],
  categories: [],
  deletedArticles: [],
  activeCategory: "",
  filteredCategories: [],
  setActiveCategory: () => {},
  setArticles: () => {},
  setDeletedArticles: () => {},
  setFilteredCategories: () => {},
});

interface IGlobalContextProvider {
  children?: React.ReactNode;
  value?: Partial<IGlobalContext>;
}

export const GlobalContextProvider: React.FC<IGlobalContextProvider> = ({
  children,
  value,
}) => {
  const [articles, setArticles] = useState<IArticle[]>(value?.articles || []);
  const [categories] = useState<string[]>(value?.categories || []);
  const [activeCategory, setActiveCategory] = useState<string>(
    value?.activeCategory || "",
  );
  const [deletedArticles, setDeletedArticles] = useState<IArticle[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        articles,
        setArticles,
        categories,
        deletedArticles,
        setDeletedArticles,
        activeCategory,
        setActiveCategory,
        filteredCategories,
        setFilteredCategories,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
