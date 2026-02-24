import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceFilter from "./ServiceFilter";
import UrlContext from "../../context/UrlContext/UrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderWithContext = (
  urlParams = {},
  setUrl = jest.fn(),
  setUrlParams = jest.fn(),
) => {
  return render(
    <UrlContext.Provider value={{ setUrl }}>
      <UrlParamsContext.Provider value={{ urlParams, setUrlParams }}>
        <ServiceFilter />
      </UrlParamsContext.Provider>
    </UrlContext.Provider>,
  );
};

describe("ServiceFilter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Filters button when select_categories and select_demographics are not active", () => {
    renderWithContext({});
    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Clear all" })).not.toBeInTheDocument();
  });

  it("clicking Filters navigates with select_demographics=true and updates context", () => {
    const setUrl = jest.fn();
    const setUrlParams = jest.fn();
    renderWithContext(
      { category_explorer: "1", postcode: "E81AA" },
      setUrl,
      setUrlParams,
    );
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining("select_demographics=true"),
    );
    expect(setUrl).toHaveBeenCalled();
    expect(setUrlParams).toHaveBeenCalled();
  });

  it("shows Clear all and hides Filters when select_categories is true", () => {
    renderWithContext({ select_categories: "true" });
    expect(screen.queryByRole("button", { name: "Filters" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear all" })).toBeInTheDocument();
  });

  it("shows Clear all when select_demographics is true", () => {
    renderWithContext({ select_demographics: "true" });
    expect(screen.getByRole("button", { name: "Clear all" })).toBeInTheDocument();
  });
});
