import { useState } from "react";
import { useAppData } from "../contexts/AppData";

export default function AddCategory() {
  const { categories, setCategories } = useAppData();
  const [newCategory, setNewCategory] = useState("");

  return (
    <section>
      <form
        aria-label="form"
        onSubmit={(e) => {
          e.preventDefault();
          const category = newCategory.toLowerCase().trim();
          if (categories.indexOf(category) < 0) {
            setCategories([...categories, category]);
          }
          setNewCategory("");
        }}
      >
        <input
          type="text"
          required
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button disabled={newCategory.trim() === ""}>add</button>
      </form>

      <ul>
        {categories.map((cat, id) => (
          <li key={id}>
            {cat}
            <button
              data-testid={`bin-${id}`}
              onClick={() =>
                setCategories(categories.filter((catItem) => catItem !== cat))
              }
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-row-gap: 1rem;
          margin-top: 2rem;
        }

        ul li {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        li button {
          border: none;
          outline: none;
          cursor: pointer;
          background: #ff5a7b;
          color: #fff;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
}
