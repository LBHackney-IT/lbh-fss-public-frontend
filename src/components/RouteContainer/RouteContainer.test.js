import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RouteContainer from "./RouteContainer";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../Category/CategoryExplorer", () => () => <div data-testid="category-explorer">CategoryExplorer</div>);
jest.mock("../Service/ListServices", () => ({ onClick }) => (
  <div data-testid="list-services">
    ListServices
    <button type="button" onClick={() => onClick("99")}>
      Select service 99
    </button>
  </div>
));
jest.mock("../Service/ServiceDetail", () => () => <div data-testid="service-detail">ServiceDetail</div>);
jest.mock("../Postcode/SetPostcode", () => () => <div data-testid="set-postcode">SetPostcode</div>);
jest.mock("../SelectCategories/SelectCategories", () => () => <div data-testid="select-categories">SelectCategories</div>);
jest.mock("../SelectDemographics/SelectDemographics", () => () => (
  <div data-testid="select-demographics">SelectDemographics</div>
));
jest.mock("../ServiceSearch/ServiceSearchProcess", () => () => (
  <div data-testid="service-search-process">ServiceSearchProcess</div>
));
jest.mock("../Home/Home", () => () => <div data-testid="home">Home</div>);

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
      <PrevUrlContext.Provider value={{ prevUrl: ctx.prevUrl, setPrevUrl: ctx.setPrevUrl }}>
        <UrlParamsContext.Provider value={{ urlParams: ctx.urlParams, setUrlParams: ctx.setUrlParams }}>
          <PrevUrlParamsContext.Provider
            value={{ prevUrlParams: ctx.prevUrlParams, setPrevUrlParams: ctx.setPrevUrlParams }}
          >
            <RouteContainer />
          </PrevUrlParamsContext.Provider>
        </UrlParamsContext.Provider>
      </PrevUrlContext.Provider>
    </UrlContext.Provider>,
  );
};

describe("RouteContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Home when urlParams is empty", async () => {
    renderWithContext();
    await waitFor(() => {
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
  });

  it("renders CategoryExplorer when urlParams has category_explorer", async () => {
    renderWithContext({ urlParams: { category_explorer: "1" } });
    await waitFor(() => {
      expect(screen.getByTestId("category-explorer")).toBeInTheDocument();
    });
  });

  it("renders SetPostcode when urlParams has set_postcode=true", async () => {
    renderWithContext({ urlParams: { set_postcode: "true" } });
    await waitFor(() => {
      expect(screen.getByTestId("set-postcode")).toBeInTheDocument();
    });
  });

  it("renders ServiceDetail when urlParams has support_service", async () => {
    renderWithContext({ urlParams: { support_service: "123" } });
    await waitFor(() => {
      expect(screen.getByTestId("service-detail")).toBeInTheDocument();
    });
  });

  it("renders ListServices when urlParams has service_search", async () => {
    renderWithContext({ urlParams: { service_search: "youth" } });
    await waitFor(() => {
      expect(screen.getByTestId("list-services")).toBeInTheDocument();
    });
  });

  it("renders ServiceSearchProcess when urlParams has service_search_process=true", async () => {
    renderWithContext({ urlParams: { service_search_process: "true" } });
    await waitFor(() => {
      expect(screen.getByTestId("service-search-process")).toBeInTheDocument();
    });
  });

  it("ServiceCardEvent updates URL and context when selecting a service from ListServices", async () => {
    const setUrl = jest.fn();
    const setUrlParams = jest.fn();
    const setPrevUrl = jest.fn();
    const setPrevUrlParams = jest.fn();
    renderWithContext({
      url: "?service_search=youth",
      urlParams: { service_search: "youth" },
      setUrl,
      setUrlParams,
      setPrevUrl,
      setPrevUrlParams,
      prevUrl: ["", "?service_search=youth"],
      prevUrlParams: [{}, { service_search: "youth" }],
    });
    await waitFor(() => {
      expect(screen.getByTestId("list-services")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Select service 99"));
    expect(mockNavigate).toHaveBeenCalledWith("?support_service=99");
    expect(setUrl).toHaveBeenCalledWith("?support_service=99");
    expect(setUrlParams).toHaveBeenCalledWith({ support_service: "99" });
    expect(setPrevUrl).toHaveBeenCalled();
    expect(setPrevUrlParams).toHaveBeenCalled();
  });
});
