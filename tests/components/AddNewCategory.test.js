import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddNewCategory from "../../components/AddNewCategory";

const categories = ["rocket", "science"];

test("adding a new category works", () => {
  const mockOnChange = jest.fn();
  const { getByRole, getByText } = render(
    <AddNewCategory categories={categories} onChange={mockOnChange} />
  );
  categories.forEach((category) => {
    getByText(category);
  });
  expect(getByText("add")).toBeDisabled();
  fireEvent.change(getByRole("textbox"), { target: { value: "new category" } });
  expect(getByText("add")).toBeEnabled();
  fireEvent.submit(getByRole("form"));
  expect(mockOnChange).toHaveBeenCalled();
  expect(getByRole("textbox")).toHaveValue("");
});

test("when a category is deleted", () => {
  const mockOnChange = jest.fn();
  const { getByTestId } = render(
    <AddNewCategory categories={categories} onChange={mockOnChange} />
  );
  fireEvent.click(getByTestId("bin-0"));
  expect(mockOnChange).toHaveBeenCalled();
});
