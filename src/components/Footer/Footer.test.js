import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

jest.mock("styled-components-breakpoint", () => () => () => "");

describe("Footer", () => {
  it("renders digital support heading", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "Do you need digital support?" })).toBeInTheDocument();
  });

  it("renders Digital skills page link", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /our Digital skills page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#LINK");
  });

  it("renders VCO section heading", () => {
    render(<Footer />);
    expect(
      screen.getByRole("heading", {
        name: "Information for Voluntary and Community Orginsations",
      }),
    ).toBeInTheDocument();
  });

  it("renders all footer links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Register your service to be listed" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See if you are eligible for a grant" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Support to improve your online presence" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log In to your account" })).toBeInTheDocument();
  });
});
