import { handleSetPrevUrl } from "./handleSetPrevUrl";

describe("handleSetPrevUrl", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    window.location = { ...originalLocation, search: "" };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it("returns undefined when currentSearch is empty", () => {
    window.location.search = "";
    expect(handleSetPrevUrl({ prevUrl: [] })).toBeUndefined();
  });

  it("returns undefined when URL contains set_postcode (avoids loop)", () => {
    window.location.search = "?set_postcode=1";
    expect(handleSetPrevUrl({ prevUrl: [] })).toBeUndefined();
  });

  it("returns undefined when prevUrl last item equals current search (avoids duplicate)", () => {
    window.location.search = "?postcode=E81AA";
    expect(handleSetPrevUrl({ prevUrl: ["", "?postcode=E81AA"] })).toBeUndefined();
  });

  it("returns prevUrlArray and prevUrlParamsArray when URL has tracked params", () => {
    window.location.search = "?postcode=E81AA&category_explorer=1";
    const result = handleSetPrevUrl({ prevUrl: [""] });
    expect(result).toEqual({
      prevUrlArray: ["", "?postcode=E81AA&category_explorer=1"],
      prevUrlParamsArray: [{}, { postcode: "E81AA", category_explorer: "1" }],
    });
  });

  it("only includes params from paramsArray in paramObj", () => {
    window.location.search = "?postcode=E81AA&unknown=foo&demographic=bar";
    const result = handleSetPrevUrl({ prevUrl: [""] });
    expect(result.prevUrlParamsArray[1]).toEqual({
      postcode: "E81AA",
      demographic: "bar",
    });
  });
});
