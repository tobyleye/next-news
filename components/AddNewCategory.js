import { useState } from "react";

export default function AddNewCategory({ categories, onChange }) {
  const [newCategory, setNewCategory] = useState("");

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const category = newCategory.toLowerCase();
          if (categories.indexOf(category) < 0) {
            onChange([...categories, category]);
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
        <button>add</button>
      </form>

      <ul>
        {categories.map((cat, id) => (
          <li key={id}>
            {cat}
            <button
              onClick={() =>
                onChange(categories.filter((catItem) => catItem !== cat))
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
