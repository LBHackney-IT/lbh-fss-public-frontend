import React from "react";
import { render } from "@testing-library/react";
import TestComponent from "./TestComponent";

test("renders hello world text", () => {
  const { getByText } = render(<TestComponent />);
  const textElement = getByText(/hello world/i);
  expect(textElement).toBeInTheDocument();
});
