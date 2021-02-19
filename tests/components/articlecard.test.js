import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ArticleCard from "../../components/ArticleCard";

describe("ArticleCard", () => {
  it("renders without crashing", () => {
    const article = {
      title: "article title",
      description: "description",
      url: "localhost:3000",
      urlToImage: "",
      publishedAt: new Date(),
    };

    render(<ArticleCard {...article} />);
    expect(screen.getByRole("heading")).toHaveTextContent(article.title);
  });
});
