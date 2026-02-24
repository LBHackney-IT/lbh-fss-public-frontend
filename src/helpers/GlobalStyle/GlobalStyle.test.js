import React from "react";
import { render } from "@testing-library/react";

jest.mock("styled-components-breakpoint", () => ({
  __esModule: true,
  default: () => () => "",
}));

const { GlobalStyle } = require("./GlobalStyle");

describe("GlobalStyle", () => {
  it("renders without throwing", () => {
    expect(() => render(<GlobalStyle />)).not.toThrow();
  });
});
