import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceCard from "./ServiceCard";

describe("ServiceCard", () => {
  const defaultService = {
    id: "1",
    name: "Test Service",
    description: "A test service description",
    images: null,
    locations: [
      {
        address1: "10 Test St",
        address2: "",
        city: "London",
        stateProvince: "Greater London",
        postalCode: "E1 1AA",
        distance: "0.5 miles",
      },
    ],
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: { getItem: jest.fn(() => "E81AA") },
      writable: true,
    });
  });

  it("renders service name and description", () => {
    render(<ServiceCard service={defaultService} onClick={jest.fn()} />);
    expect(screen.getByRole("heading", { name: "Test Service" })).toBeInTheDocument();
    expect(screen.getByText("A test service description")).toBeInTheDocument();
  });

  it("calls onClick with service id when card is clicked", () => {
    const onClick = jest.fn();
    render(<ServiceCard service={defaultService} onClick={onClick} />);
    fireEvent.click(screen.getByText("Test Service").closest("div"));
    expect(onClick).toHaveBeenCalledWith("1");
  });

  it("renders distance link when location has distance", () => {
    render(<ServiceCard service={defaultService} onClick={jest.fn()} />);
    expect(screen.getByText("0.5 miles")).toBeInTheDocument();
    expect(screen.getByText(/Distance:/)).toBeInTheDocument();
  });

  it("does not render distance when location distance is null", () => {
    const serviceNoDistance = {
      ...defaultService,
      locations: [{ ...defaultService.locations[0], distance: null }],
    };
    render(<ServiceCard service={serviceNoDistance} onClick={jest.fn()} />);
    expect(screen.queryByText(/Distance:/)).not.toBeInTheDocument();
  });

  it("renders image when service has images.medium", () => {
    const serviceWithImage = {
      ...defaultService,
      images: { medium: "https://example.com/image.jpg" },
    };
    render(<ServiceCard service={serviceWithImage} onClick={jest.fn()} />);
    const img = screen.getByRole("img", { name: "Test Service" });
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("does not render image container when no image", () => {
    render(<ServiceCard service={defaultService} onClick={jest.fn()} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
