import Head from "next/head";
import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Tab from "../components/Tab";
import AddNewCategory from "../components/AddNewCategory";
import Loading from "../components/Loading";
import GlobalStyles from "../components/Styles";

const CATEGORIES_STORAGEKEY = "categories";

const views = {
  add: "add",
  list: "list",
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [view, setView] = useState(views.list);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const url =
        process.env.NODE_ENV === "production"
          ? "/.netlify/functions/getArticles"
          : "http://localhost:9000/getArticles";
      const data = await fetch(`${url}?q=${activeCategory}`).then((res) =>
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
    if (activeCategory) {
      fetchNews();
    }
  }, [activeCategory]);

  useEffect(() => {
    loadCategories().then((categories) => {
      setCategories(categories);
      setActiveCategory(categories[0]);
    });
  }, []);

  // persist categories
  useEffect(saveCategories, [categories]);

  async function loadCategories() {
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

  const toggleMode = () => setIsDarkMode((mode) => !mode);

  return (
    <div className="container">
      <GlobalStyles isDarkMode={isDarkMode} />
      <Head>
        <title>Next New</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button className="mode-toggle" onClick={toggleMode}>
        {isDarkMode ? "🌞" : "🌚"}
      </button>
      <section>
        <header>
          <h3>Next News</h3>
          <button onClick={() => setView(views.add)}>Add category</button>
        </header>

        <Tab
          tabs={categories}
          active={view === views.list && activeCategory}
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
              <Loading />
            ) : (
              <div>
                {articles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    {...article}
                    hasHr={index < articles.length - 1}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </section>
      <style>{`
         body {
          color: var(--text-color);
          background-color: var(--bg-color);
        }
      `}</style>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 30px auto 20px;
          padding: 0 18px;
          position: relative;
        }
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .mode-toggle {
          font-size: 2.4rem;
          border: none;
          outline: none;
          cursor: pointer;
          background: none;
          position: fixed;
          bottom: 3%;
          right: 5%;
        }
        @media screen and (min-width: 740px) {
          .mode-toggle {
            right: 20%;
          }
        }
      `}</style>
    </div>
  );
}
