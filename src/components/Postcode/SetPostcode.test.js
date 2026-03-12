import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SetPostcode from "./SetPostcode";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";

jest.mock("postcode-validator", () => ({
  postcodeValidator: jest.fn(),
}));
jest.mock("styled-components-breakpoint", () => () => () => "");
jest.mock("../Header/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("../MapPlaceholder/MapPlaceholder", () => () => (
  <div data-testid="map">Map</div>
));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const { postcodeValidator } = require("postcode-validator");

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
            <SetPostcode />
          </PrevUrlParamsContext.Provider>
        </UrlParamsContext.Provider>
      </PrevUrlContext.Provider>
    </UrlContext.Provider>,
  );
};

describe("SetPostcode", () => {
  let setItemSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    Object.defineProperty(window, "localStorage", {
      value: { getItem: jest.fn(() => null), setItem: setItemSpy },
      writable: true,
    });
    postcodeValidator.mockReturnValue(true);
  });

  it("renders heading and form", async () => {
    renderWithContext();
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Enter full postcode" }),
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByLabelText("postcode")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enter postcode" })).toBeInTheDocument();
  });

  it("on valid postcode submit sets localStorage and navigates", async () => {
    postcodeValidator.mockReturnValue(true);
    const setUrl = jest.fn();
    const setUrlParams = jest.fn();
    renderWithContext({ setUrl, setUrlParams });

    const input = screen.getByLabelText("postcode");
    fireEvent.change(input, { target: { value: "E8 1DY" } });
    fireEvent.click(screen.getByRole("button", { name: "Enter postcode" }));

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith("postcode", "E8 1DY");
    });
    expect(mockNavigate).toHaveBeenCalled();
    expect(setUrl).toHaveBeenCalled();
    expect(setUrlParams).toHaveBeenCalled();
  });

  it("shows validation error for invalid postcode", async () => {
    postcodeValidator.mockReturnValue(false);
    renderWithContext();

    const input = screen.getByLabelText("postcode");
    fireEvent.change(input, { target: { value: "INVALID" } });
    fireEvent.click(screen.getByRole("button", { name: "Enter postcode" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/valid postcode/i);
    });
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
