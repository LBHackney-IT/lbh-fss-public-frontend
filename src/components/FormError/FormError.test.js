import React from "react";
import { render, screen } from "@testing-library/react";
import FormError from "./FormError";

describe("FormError", () => {
  it("renders the error message", () => {
    render(<FormError error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("has role alert for accessibility", () => {
    render(<FormError error="Invalid postcode" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid postcode");
  });
});
