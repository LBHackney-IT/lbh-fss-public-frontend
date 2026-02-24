import { breakpoint, map } from "./breakpoint";

describe("breakpoint", () => {
  it("exports breakpoint as a function", () => {
    expect(typeof breakpoint).toBe("function");
  });

  it("exports map as a function", () => {
    expect(typeof map).toBe("function");
  });
});
