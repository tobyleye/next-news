import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppData } from "../contexts/AppData";

export default function Header() {
  const { categories } = useAppData();
  const { query } = useRouter();

  const className = (category) => {
    return query.category === category ? "active" : "";
  };

  return (
    <header>
      <div>
        <h3>Next News</h3>
        <Link href="/add_category">
          <button>Add category</button>
        </Link>
      </div>
      <nav>
        {categories.map((category, idx) => (
          <Link href={`/c/${category}`} key={idx}>
            <button className={className(category)}>{category}</button>
          </Link>
        ))}
      </nav>
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        nav {
          margin-bottom: 20px;
          display: flex;
          flex-wrap: wrap;
        }
        nav button {
          border: none;
          outline: none;
          cursor: pointer;
          margin-bottom: 5px;
          margin-right: 5px;
          text-transform: capitalize;
        }
        nav button.active {
          font-size: 18px;
        }
      `}</style>
    </header>
  );
}
