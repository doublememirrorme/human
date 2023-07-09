import Image from "next/image";
import { ReactNode } from "react";
import styles from "./article.module.sass";

export interface IArticle {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  post_image: string;
  post_thumbnail: string;
  post_category_id: string;
}

interface ILinkTo {
  children: ReactNode;
  [key: string]: any;
}

const LinkTo = (slug: string) =>
  function withChildren({ children, ...props }: ILinkTo) {
    return (
      <a
        href={`https://react-challenge.human.hr/news/${slug}`}
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  };

const Article = ({
  title,
  excerpt,
  post_image,
  slug,
  onDelete: handleDelete,
}: Pick<IArticle, "title" | "excerpt" | "post_image" | "slug"> & {
  onDelete: (slug: string) => void;
}) => {
  const Link = LinkTo(slug);

  return (
    <article className={styles.article}>
      <button
        className={styles.article__delete}
        onClick={() => handleDelete(slug)}
      >
        X
      </button>
      <Link className={styles.image__link}>
        <Image
          src={`https://react-challenge.human.hr/${post_image}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className={styles.image}
        />
      </Link>

      <Link>
        <h2 className={styles.title}>{title}</h2>
      </Link>

      <div
        className={styles.excerpt}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />

      <Link className={styles.article__link}>Full article</Link>
    </article>
  );
};
export default Article;
