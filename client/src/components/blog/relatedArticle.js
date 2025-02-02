const RelatedArticles = ({ articles }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">Related Articles</h3>
      <ul>
        {articles?.map(article => (
          <li key={article.id} className="text-indigo-600 mb-1">
            <a href={`/articles/${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedArticles;
