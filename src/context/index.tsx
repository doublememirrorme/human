"use client";

import { createContext, useContext, useState } from "react";
import { get as getArticles } from "@/api/articles";
import { getCategoriesFromArticles } from "@/utils";
import { IArticle } from "@/components/article";
import React from "react";

interface IGlobalContext {
  articles: IArticle[];
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const GlobalContext = createContext<IGlobalContext>({
  articles: [],
  categories: [],
  activeCategory: "",
  setActiveCategory: () => {},
});

interface IGlobalContextProvider {
  children?: React.ReactNode;
  value?: Partial<IGlobalContext>;
}

export const GlobalContextProvider: React.FC<IGlobalContextProvider> = ({
  children,
  value,
}) => {
  const [articles] = useState<IArticle[]>(value?.articles || []);
  const [categories] = useState<string[]>(value?.categories || []);
  const [activeCategory, setActiveCategory] = useState<string>(
    value?.activeCategory || "",
  );

  return (
    <GlobalContext.Provider
      value={{
        articles,
        categories,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
