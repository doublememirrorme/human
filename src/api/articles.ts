import { IArticle } from "@/components/article";
import { API_URL } from "../constants";

export const get = async (): Promise<IArticle[]> => {
  const res = await fetch(`${API_URL}/last-100-news.json`);
  const articles = await res.json();
  return articles;
};
