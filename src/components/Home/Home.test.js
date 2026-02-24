import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "./Home";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
jest.mock("styled-components-breakpoint", () => () => () => "");
jest.mock("../Header/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("../FormInputSubmit/FormInputSubmit", () => ({ register, ...rest }) => (
  <input data-testid="search-input" {...register("service_search")} {...rest} />
));
jest.mock("../Category/ListCategories", () => ({ onClick }) => (
  <div data-testid="list-categories">
    <button type="button" onClick={() => onClick("cat-1")}>
      Category 1
    </button>
  </div>
));
jest.mock("../MapPlaceholder/MapPlaceholder", () => () => (
  <div data-testid="map">Map</div>
));

const originalLocation = window.location;

const defaultContext = {
  setUrl: jest.fn(),
  setPrevUrl: jest.fn(),
  setUrlParams: jest.fn(),
  setPrevUrlParams: jest.fn(),
};

const renderWithContext = (contextOverrides = {}) => {
  const ctx = { ...defaultContext, ...contextOverrides };
  return render(
    <UrlContext.Provider value={{ setUrl: ctx.setUrl }}>
      <PrevUrlContext.Provider value={{ setPrevUrl: ctx.setPrevUrl }}>
        <UrlParamsContext.Provider value={{ setUrlParams: ctx.setUrlParams }}>
          <PrevUrlParamsContext.Provider
            value={{ setPrevUrlParams: ctx.setPrevUrlParams }}
          >
            <Home />
          </PrevUrlParamsContext.Provider>
        </UrlParamsContext.Provider>
      </PrevUrlContext.Provider>
    </UrlContext.Provider>,
  );
};

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { search: "" };
    Object.defineProperty(window, "localStorage", {
      value: { getItem: jest.fn(() => "E81AA") },
      writable: true,
    });
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it("renders Header, form and ListCategories", async () => {
    renderWithContext();
    await waitFor(() => {
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("list-categories")).toBeInTheDocument();
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("selectCategory navigates and updates urlParams when category is clicked", async () => {
    const setUrlParams = jest.fn();
    const setPrevUrl = jest.fn();
    const setPrevUrlParams = jest.fn();
    renderWithContext({ setUrlParams, setPrevUrl, setPrevUrlParams });
    await waitFor(() => {
      expect(screen.getByTestId("list-categories")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Category 1"));
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining("category_explorer=cat-1"),
    );
    expect(setUrlParams).toHaveBeenCalledWith(
      expect.objectContaining({ category_explorer: "cat-1" }),
    );
  });
});
