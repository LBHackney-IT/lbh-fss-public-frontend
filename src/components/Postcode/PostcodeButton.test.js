import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostcodeButton from "./PostcodeButton";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("postcode-validator", () => ({
  postcodeValidator: jest.fn(),
}));
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="font-awesome-icon" />,
}));
jest.mock("styled-components-breakpoint", () => () => () => "");

const mockNavigate = jest.fn();

describe("PostcodeButton", () => {
  let setUrl;
  let setUrlParams;

  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    setUrl = jest.fn();
    setUrlParams = jest.fn();
    localStorage.clear();
  });

  const renderWithContext = (urlParams = {}) => {
    const UrlContext = require("../../context/UrlContext/UrlContext").default;
    const UrlParamsContext =
      require("../../context/UrlParamsContext/UrlParamsContext").default;
    return render(
      <UrlContext.Provider value={{ setUrl }}>
        <UrlParamsContext.Provider value={{ urlParams, setUrlParams }}>
          <PostcodeButton />
        </UrlParamsContext.Provider>
      </UrlContext.Provider>,
    );
  };

  it("shows Set your postcode when no postcode in localStorage", () => {
    renderWithContext();
    expect(screen.getByText("Set your postcode")).toBeInTheDocument();
  });

  it("shows stored postcode from localStorage", () => {
    localStorage.setItem("postcode", "E8 1EA");
    renderWithContext();
    expect(screen.getByText("E8 1EA")).toBeInTheDocument();
  });

  it("on click navigates to set_postcode and calls setUrl and setUrlParams", () => {
    renderWithContext();
    fireEvent.click(screen.getByText("Set your postcode"));
    expect(mockNavigate).toHaveBeenCalledWith("?set_postcode=true");
    expect(setUrl).toHaveBeenCalledWith("?set_postcode=true");
    expect(setUrlParams).toHaveBeenCalledWith({ set_postcode: "true" });
  });

  it("stores valid postcode from urlParams in localStorage", () => {
    const { postcodeValidator } = require("postcode-validator");
    postcodeValidator.mockReturnValue(true);
    renderWithContext({ postcode: "E8%201EA" });
    expect(postcodeValidator).toHaveBeenCalledWith("E8 1EA", "UK");
    expect(localStorage.getItem("postcode")).toBe("E8 1EA");
  });

  it("does not overwrite localStorage when urlParams postcode is invalid", () => {
    localStorage.setItem("postcode", "E8 1EA");
    const { postcodeValidator } = require("postcode-validator");
    postcodeValidator.mockReturnValue(false);
    renderWithContext({ postcode: "invalid" });
    expect(localStorage.getItem("postcode")).toBe("E8 1EA");
  });
});
