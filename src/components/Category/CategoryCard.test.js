import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryCard from "./CategoryCard";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon">icon</span>,
}));

const categoryIconMap = {
  "loneliness-or-isolation": ["fas", "comments"],
  "arts-and-creativity": ["fas", "palette"],
};
jest.mock("../../helpers/FontAwesome/fontawesome", () => ({
  categoryIconMap,
}));

describe("CategoryCard", () => {
  const category = {
    id: "1",
    name: "Loneliness or isolation",
    description: "Support for feeling connected",
  };
  const onClick = jest.fn();

  const renderWithContext = (urlParams = {}) => {
    return render(
      <UrlParamsContext.Provider value={{ urlParams }}>
        <CategoryCard category={category} onClick={onClick} />
      </UrlParamsContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders category name and description", () => {
    renderWithContext();
    expect(
      screen.getByRole("heading", { name: "Loneliness or isolation" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Support for feeling connected")).toBeInTheDocument();
  });

  it("uses category icon from map when name matches", () => {
    renderWithContext();
    expect(screen.getByTestId("fa-icon")).toBeInTheDocument();
    expect(screen.getByText(/Icon for Loneliness or isolation/)).toBeInTheDocument();
  });

  it("calls onClick with category id when urlParams has no category_explorer", () => {
    renderWithContext({});
    const card = document.getElementById("1");
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledWith("1");
  });

  it("calls onClick when urlParams has empty category_explorer", () => {
    renderWithContext({ category_explorer: "" });
    const card = document.getElementById("1");
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledWith("1");
  });

  it("does not call onClick when on category_explorer page", () => {
    renderWithContext({ category_explorer: "1" });
    const card = document.getElementById("1");
    fireEvent.click(card);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets data-category-icon from category name", () => {
    renderWithContext();
    const container = document.querySelector(
      '[data-category-icon="loneliness-or-isolation"]',
    );
    expect(container).toBeInTheDocument();
  });
});
