import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ArticleCard from "../../components/ArticleCard";

it("renders without crashing", () => {
  const article = {
    title: "article title",
    description: "description",
    url: "localhost:3000",
    urlToImage: "image_url",
    publishedAt: new Date(),
  };

  render(<ArticleCard {...article} />);
  expect(screen.getByRole("heading")).toHaveTextContent(article.title);
  expect(screen.getByRole("img")).toHaveAttribute("src", article.urlToImage);
});
