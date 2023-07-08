const ArticlePage = async ({}) => {
  const article = await fetch(
    "https://react-challenge.human.hr/news/x-universe-grows-bigger-in-tides-of-avarice",
  );
  console.log({ article });
  return <h1>Hello World</h1>;
};

export default ArticlePage;
