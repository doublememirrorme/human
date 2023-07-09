"use client";

import Article from "@/components/article";
import CategoryFilter from "@/components/category-filter";
import React, {
  CSSProperties,
  ComponentType,
  ReactElement,
  useRef,
  useState,
} from "react";
import { VariableSizeList as List } from "react-window";
import styles from "./article-list.module.sass";

interface IChildComponent extends ReactElement {
  type: ComponentType<typeof Article>;
}

interface IArticleList {
  children?: IChildComponent[];
}

const ArticleList: React.FC<IArticleList> = ({ children = [] }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(window?.innerWidth > 768);
  const [isLowRes, setIsLowRes] = useState<boolean>(window?.innerWidth < 500);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
      setIsLowRes(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const RenderRow = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => <li style={style}>{children[index]}</li>;

  return (
    <div className={styles.list__wrapper}>
      <header className={styles.list__header}>
        <h3 className={styles.list__results}>
          Result: {children.length} articles
        </h3>

        <CategoryFilter />
      </header>

      <List
        className={styles.list}
        height={window.innerHeight - (isDesktop ? 200 : 330)}
        itemCount={children.length}
        itemSize={() => (isDesktop ? 260 : isLowRes ? 700 : 600)}
        width="100%"
      >
        {RenderRow}
      </List>
    </div>
  );
};

export default ArticleList;
