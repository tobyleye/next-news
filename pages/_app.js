import Layout from "../components/Layout";
import { AppDataProvider } from "../contexts/AppData";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppDataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppDataProvider>
  );
}

export default MyApp;
