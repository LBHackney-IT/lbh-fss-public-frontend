import React from "react";
import { render, screen } from "@testing-library/react";
import Address from "./Address";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="font-awesome-icon">icon</span>,
}));

describe("Address", () => {
  const defaultAddress = {
    uprn: "1",
    address1: "10 Test Street",
    address2: "Flat 2",
    city: "London",
    stateProvince: "Greater London",
    postalCode: "E1 1AA",
    distance: "0.5 miles",
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: { getItem: jest.fn(() => "E81AA") },
      writable: true,
    });
  });

  it("renders address line 1 as link", () => {
    render(<Address address={defaultAddress} />);
    const link = screen.getByRole("link", { name: /10 Test Street/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders distance when provided", () => {
    render(<Address address={defaultAddress} />);
    expect(screen.getByText("0.5 miles away")).toBeInTheDocument();
  });

  it("does not render distance span when distance is null", () => {
    render(<Address address={{ ...defaultAddress, distance: null }} />);
    expect(screen.queryByText(/away/)).not.toBeInTheDocument();
  });
});
