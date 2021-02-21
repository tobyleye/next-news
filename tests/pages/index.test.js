import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByText,
} from "@testing-library/react";
import Index from "../../pages/index";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: "ok",
        articles: [
          {
            title: "article",
            description: "lorem ipsum",
            publishedAt: new Date(),
          },
        ],
      }),
  })
);

describe("Index", () => {
  test("renders Index component", async () => {
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      getByText("Next News");
    });
  });
});

describe("AddNewCategory Integration", () => {
  beforeEach(async () => {
    const { findByText } = render(<Index />);
    const button = await findByText("Add category");
    fireEvent.click(button);
  });
  test("render AddNewCategory component when add category button is clicked", async () => {
    screen.getByRole("textbox");
  });
  test("add a new tab to the tab component when a category is added", async () => {
    await waitFor(() => screen.getByRole("textbox"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "new category" },
    });
    fireEvent.click(screen.getByText("add"));
    getByText(screen.getByRole("navigation"), "new category");
  });
});
