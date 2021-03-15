import { createContext, useState, useEffect, useContext } from "react";

const AppData = createContext({
  categories: [],
  setCategories: () => {},
});

const CATEGORIES_STORAGEKEY = "categories";

export const AppDataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(saveCategories, [categories]);

  function saveCategories() {
    localStorage[CATEGORIES_STORAGEKEY] = JSON.stringify(categories);
  }

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

  const toggleMode = () => {
    setIsDarkMode((mode) => !mode);
  };

  return (
    <AppData.Provider
      value={{ categories, setCategories, isDarkMode, toggleMode }}
    >
      {children}
    </AppData.Provider>
  );
};

export const useAppData = () => {
  const value = useContext(AppData);
  return value;
};
