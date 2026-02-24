import React from "react";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import ServiceSearchProcess from "./ServiceSearchProcess";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../AppLoading", () => {
  return function MockAppLoading() {
    return <div data-testid="app-loading">Loading</div>;
  };
});

const mockNavigate = jest.fn();

describe("ServiceSearchProcess", () => {
  let setUrl;
  let setUrlParams;

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    setUrl = jest.fn();
    setUrlParams = jest.fn();
  });

  const renderWithContext = (prevUrlParams) => {
    const PrevUrlParamsContext =
      require("../../context/PrevUrlParamsContext/PrevUrlParamsContext").default;
    const UrlContext = require("../../context/UrlContext/UrlContext").default;
    const UrlParamsContext =
      require("../../context/UrlParamsContext/UrlParamsContext").default;
    return render(
      <UrlContext.Provider value={{ setUrl }}>
        <UrlParamsContext.Provider value={{ setUrlParams }}>
          <PrevUrlParamsContext.Provider value={{ prevUrlParams }}>
            <ServiceSearchProcess />
          </PrevUrlParamsContext.Provider>
        </UrlParamsContext.Provider>
      </UrlContext.Provider>,
    );
  };

  it("renders AppLoading", () => {
    renderWithContext([{ service_search: "elderly" }]);
    expect(screen.getByTestId("app-loading")).toBeInTheDocument();
  });

  it("navigates with query string from last prevUrlParams and calls setUrl and setUrlParams", () => {
    const lastParams = { service_search: "elderly", select_demographics: "true" };
    renderWithContext([{}, lastParams]);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    const push = mockNavigate.mock.calls[0][0];
    expect(push).toContain("service_search=elderly");
    expect(push).not.toContain("select_demographics");
    expect(setUrl).toHaveBeenCalledWith(push);
    expect(setUrlParams).toHaveBeenCalledWith(
      expect.objectContaining({ service_search: "elderly" }),
    );
  });
});
