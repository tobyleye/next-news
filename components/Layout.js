import Head from "next/head";
import GlobalStyles from "./Styles";
import Header from "./Header";
import { useAppData } from "../contexts/AppData";

export default function Layout({ children }) {
  const { isDarkMode, toggleMode } = useAppData();
  return (
    <div className="container">
      <Head>
        <title>Next News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles isDarkMode={isDarkMode} />

      <button className="mode-toggle" onClick={toggleMode}>
        {isDarkMode ? "🌞" : "🌚"}
      </button>
      <Header />
      {children}

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
