import Article from "../article";
import { ComponentType, ReactElement } from "react";
import React from "react";
import styles from "./article-list.module.sass";

interface IChildComponent extends ReactElement {
  type: ComponentType<typeof Article>;
}

interface IArticleList {
  children?: IChildComponent[];
}

const ArticleList: React.FC<IArticleList> = ({ children = [] }) => (
  <div>
    <h3 className={styles.list__results}>Result: {children.length} articles</h3>
    <ul className={styles.list}>
      {React.Children.map(children, (child: IChildComponent, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  </div>
);

export default ArticleList;
