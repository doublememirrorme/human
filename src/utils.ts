import { IArticle } from "./components/article";
import { CATEGORIES } from "./constants";

export const getCategoriesFromArticles =
  (articles: IArticle[]): string[] =>
    articles
      .reduce((acc: string[], article: IArticle) =>
        acc.includes(article.post_category_id)
          ? acc
          : [...acc, article.post_category_id],
    [])
  // .map((id: string) => CATEGORIES[id])