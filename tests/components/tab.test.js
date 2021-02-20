import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tab from "../../components/Tab";

test("tab", () => {
  const tabs = ["science", "education", "economy", "technology"];
  render(<Tab tabs={tabs} />);
  tabs.forEach((tab) => {
    expect(screen.getByText(tab)).toBeInTheDocument();
  });
});
