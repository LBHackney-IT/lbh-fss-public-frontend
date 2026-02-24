import React from "react";
import { render, screen } from "@testing-library/react";
import Share from "./Share";

const originalLocation = window.location;

describe("Share", () => {
  beforeEach(() => {
    delete window.location;
    window.location = { href: "https://example.com/service/123" };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it("renders share buttons", () => {
    const service = { service: { name: "Test Service Name" } };
    render(<Share {...service} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it("uses current URL for share links", () => {
    const service = { service: { name: "My Service" } };
    render(<Share {...service} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      const link = btn.closest("a") || btn;
      const href = link.getAttribute?.("href") || link.href;
      if (href) expect(href).toContain("https://example.com");
    });
  });
});
