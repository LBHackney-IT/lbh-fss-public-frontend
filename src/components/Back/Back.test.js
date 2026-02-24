import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Back from "./Back";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";

const mockNavigate = jest.fn();
const mockLocation = { search: "" };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="back-icon">icon</span>,
}));

const defaultContext = {
  url: "",
  setUrl: jest.fn(),
  prevUrl: [""],
  setPrevUrl: jest.fn(),
  urlParams: {},
  setUrlParams: jest.fn(),
  prevUrlParams: [{}],
  setPrevUrlParams: jest.fn(),
};

const renderWithContext = (contextOverrides = {}) => {
  const ctx = { ...defaultContext, ...contextOverrides };
  return render(
    <UrlContext.Provider value={{ url: ctx.url, setUrl: ctx.setUrl }}>
      <PrevUrlContext.Provider
        value={{ prevUrl: ctx.prevUrl, setPrevUrl: ctx.setPrevUrl }}
      >
        <UrlParamsContext.Provider
          value={{ urlParams: ctx.urlParams, setUrlParams: ctx.setUrlParams }}
        >
          <PrevUrlParamsContext.Provider
            value={{
              prevUrlParams: ctx.prevUrlParams,
              setPrevUrlParams: ctx.setPrevUrlParams,
            }}
          >
            <Back />
          </PrevUrlParamsContext.Provider>
        </UrlParamsContext.Provider>
      </PrevUrlContext.Provider>
    </UrlContext.Provider>,
  );
};

describe("Back", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "localStorage", {
      value: { getItem: jest.fn(() => "E81AA") },
      writable: true,
    });
  });

  it("renders Back button", () => {
    renderWithContext();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByTestId("back-icon")).toBeInTheDocument();
  });

  it("navigates to /? and updates context when prevUrl is empty and Back is clicked", () => {
    const setUrl = jest.fn();
    const setUrlParams = jest.fn();
    renderWithContext({ setUrl, setUrlParams });
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/?");
    expect(setUrl).toHaveBeenCalledWith("/?");
    expect(setUrlParams).toHaveBeenCalledWith({});
  });

  it("navigates to category_explorer URL when on support_service and prevUrlParams has category_explorer", () => {
    const setUrl = jest.fn();
    const setUrlParams = jest.fn();
    const setPrevUrl = jest.fn();
    const setPrevUrlParams = jest.fn();
    const prevUrlParams = [{}, { category_explorer: "1" }];
    renderWithContext({
      urlParams: { support_service: "123" },
      prevUrl: ["", "?category_explorer=1", "?support_service=123"],
      prevUrlParams,
      setUrl,
      setUrlParams,
      setPrevUrl,
      setPrevUrlParams,
    });
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalled();
    const navigateCall = mockNavigate.mock.calls[0][0];
    expect(navigateCall).toContain("category_explorer=1");
    expect(setUrl).toHaveBeenCalled();
    expect(setUrlParams).toHaveBeenCalled();
  });

  it("navigates to list services with postcode when prevUrlParams has service_search and postcode stored", () => {
    const setUrl = jest.fn();
    const setUrlParams = jest.fn();
    const prevUrlParams = [{}, { service_search: "youth", postcode: "E81AA" }];
    renderWithContext({
      urlParams: { support_service: "123" },
      prevUrl: ["", "?service_search=youth&postcode=E81AA"],
      prevUrlParams,
      setUrl,
      setUrlParams,
    });
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalled();
    const navigateCall = mockNavigate.mock.calls[0][0];
    expect(navigateCall).toContain("service_search");
    expect(navigateCall).toContain("postcode");
  });
});
