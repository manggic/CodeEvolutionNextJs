function ArticleListByCategory({ articles, category }) {
  return (
    <>
      <h1> showing news for category {category}</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h2>
              {article.id} - {article.title}{" "}
            </h2>
            <p>{article.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default ArticleListByCategory;

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;

  console.log(req.headers.cookie);

  res.setHeader("Set-Cookie", ["name=Vishwas"]);

  const response = await fetch(
    `http://localhost:4000/news?category=${params.category}`
  );

  console.log("Pre-rendering News Article List category wise");

  const data = await response.json();

  return {
    props: {
      articles: data,
      category: params.category,
    },
  };
}
