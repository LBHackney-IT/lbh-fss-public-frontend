import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ServiceSearch from "./ServiceSearch";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";

jest.mock("styled-components-breakpoint", () => () => () => "");

describe("ServiceSearch", () => {
  const setUrlParams = jest.fn();
  const setPrevUrlParams = jest.fn();
  const defaultPrevUrlParams = [{ postcode: "E81AA" }];

  const renderWithContext = (urlParams = {}, prevUrlParams = defaultPrevUrlParams) => {
    return render(
      <UrlParamsContext.Provider value={{ urlParams, setUrlParams }}>
        <PrevUrlParamsContext.Provider value={{ prevUrlParams, setPrevUrlParams }}>
          <ServiceSearch />
        </PrevUrlParamsContext.Provider>
      </UrlParamsContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search form with label and submit", () => {
    renderWithContext();
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter keyword or organisation"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("on submit updates prevUrlParams and setUrlParams with service_search_process", async () => {
    renderWithContext();
    const input = screen.getByPlaceholderText("Enter keyword or organisation");
    fireEvent.change(input, { target: { value: "youth club" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(setPrevUrlParams).toHaveBeenCalled();
    });
    expect(setUrlParams).toHaveBeenCalledWith({ service_search_process: "true" });
  });
});
