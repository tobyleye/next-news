import Head from "next/head";
import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Tab from "../components/Tab";
import AddNewCategory from "../components/AddNewCategory";

const CATEGORIES_STORAGEKEY = "categories";

const views = {
  add: "add",
  list: "list",
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("business");
  const [view, setView] = useState(views.list);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `https://newsapi.org/v2/everything?q=${activeCategory}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json());
      setArticles(data.articles);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [activeCategory]);

  useEffect(() => {
    setCategories(loadCategories());
  }, []);

  // persist categories
  useEffect(saveCategories, [categories]);

  function loadCategories() {
    if (CATEGORIES_STORAGEKEY in localStorage) {
      return JSON.parse(localStorage[CATEGORIES_STORAGEKEY] || "[]");
    } else {
      // if no key exist
      // idealy this block should run on the first visit
      return [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ];
    }
  }

  function saveCategories() {
    localStorage[CATEGORIES_STORAGEKEY] = JSON.stringify(categories);
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <header>
          <h3>Next News</h3>
          <button onClick={() => setView(views.add)}>Add category</button>
        </header>

        <Tab
          tabs={categories}
          active={activeCategory}
          onChange={(tabName) => {
            setView(views.list);
            setActiveCategory(tabName);
          }}
        />

        {view === views.add ? (
          <AddNewCategory
            categories={categories}
            onChange={(categories) => setCategories(categories)}
          />
        ) : (
          <section>
            {isLoading ? (
              <center>Loading...</center>
            ) : (
              <div>
                {articles.map((article, id) => (
                  <>
                    <ArticleCard key={id} {...article} />
                    {id < articles.length - 1 && <hr />}
                  </>
                ))}
              </div>
            )}
          </section>
        )}
      </section>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto 20px;
          padding: 0 18px;
        }
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
