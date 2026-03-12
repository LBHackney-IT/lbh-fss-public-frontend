import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";

jest.mock("../Back/Back", () => () => <div data-testid="back">Back</div>);
jest.mock("../Postcode/PostcodeButton", () => () => (
  <button type="button">Change postcode</button>
));

const renderWithContext = (urlParams = {}) => {
  return render(
    <UrlParamsContext.Provider value={{ urlParams }}>
      <Header />
    </UrlParamsContext.Provider>,
  );
};

describe("Header", () => {
  it("shows Find support services heading when urlParams is empty (home)", () => {
    renderWithContext({});
    expect(
      screen.getByRole("heading", { name: "Find support services" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("back")).not.toBeInTheDocument();
  });

  it("shows Back and postcode button when on a non-home page", () => {
    renderWithContext({ category_explorer: "1" });
    expect(screen.getByTestId("back")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Change postcode" })).toBeInTheDocument();
  });

  it("hides postcode button on set_postcode page", () => {
    renderWithContext({ set_postcode: "1" });
    expect(screen.getByTestId("back")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Change postcode" }),
    ).not.toBeInTheDocument();
  });
});
