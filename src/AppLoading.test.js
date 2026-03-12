import React from "react";
import { render, screen } from "@testing-library/react";
import AppLoading from "./AppLoading";

describe("AppLoading", () => {
  it("renders Loading text", () => {
    render(<AppLoading />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
