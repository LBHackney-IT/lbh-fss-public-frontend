import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders with label text", () => {
    render(<Button label="Submit" />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders children when provided instead of label", () => {
    render(
      <Button>
        <span data-testid="custom-child">Custom content</span>
      </Button>,
    );
    expect(screen.getByTestId("custom-child")).toHaveTextContent("Custom content");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByText("Disabled").closest("button")).toBeDisabled();
  });

  it("applies type attribute", () => {
    render(<Button label="Submit" type="submit" />);
    expect(screen.getByText("Submit").closest("button")).toHaveAttribute(
      "type",
      "submit",
    );
  });
});
