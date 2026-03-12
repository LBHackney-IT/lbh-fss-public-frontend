import React from "react";
import { render, screen } from "@testing-library/react";
import CookieBannerDisplay from "./CookieBanner";

jest.mock("lbh-frontend", () => ({ initAll: jest.fn() }));

describe("CookieBanner", () => {
  it("renders cookie message and privacy link", () => {
    render(<CookieBannerDisplay />);
    expect(
      screen.getByText(/We use cookies to ensure you have the best experience/),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy statement/i })).toHaveAttribute(
      "href",
      "https://hackney.gov.uk/privacy",
    );
  });

  it("renders Accept and close button", () => {
    render(<CookieBannerDisplay />);
    expect(screen.getByRole("button", { name: /Accept and close/i })).toBeInTheDocument();
  });
});
