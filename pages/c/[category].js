import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard";
import Loading from "../../components/Loading";

export default function List() {
  const { query } = useRouter();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const url =
        process.env.NODE_ENV === "production"
          ? "/.netlify/functions/getArticles"
          : "http://localhost:9000/getArticles";
      const data = await fetch(`${url}?q=${query.category}`).then((res) =>
        res.json()
      );
      setArticles(data.articles);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [query]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {articles.map((article, idx) => {
            const isLast = articles.length - 1 === idx;
            return <ArticleCard key={idx} {...article} isLast={isLast} />;
          })}
        </div>
      )}
    </div>
  );
}
