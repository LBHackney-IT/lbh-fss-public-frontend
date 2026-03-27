import { handleSetPrevUrl } from "./handleSetPrevUrl";

describe("handleSetPrevUrl", () => {
  it("returns undefined when currentSearch is empty", () => {
    expect(handleSetPrevUrl({ prevUrl: [], locationSearch: "" })).toBeUndefined();
  });

  it("returns undefined when URL contains set_postcode (avoids loop)", () => {
    expect(
      handleSetPrevUrl({ prevUrl: [], locationSearch: "?set_postcode=1" }),
    ).toBeUndefined();
  });

  it("returns undefined when prevUrl last item equals current search (avoids duplicate)", () => {
    expect(
      handleSetPrevUrl({
        prevUrl: ["", "?postcode=E81AA"],
        locationSearch: "?postcode=E81AA",
      }),
    ).toBeUndefined();
  });

  it("returns prevUrlArray and prevUrlParamsArray when URL has tracked params", () => {
    const result = handleSetPrevUrl({
      prevUrl: [""],
      locationSearch: "?postcode=E81AA&category_explorer=1",
    });
    expect(result).toEqual({
      prevUrlArray: ["", "?postcode=E81AA&category_explorer=1"],
      prevUrlParamsArray: [{}, { postcode: "E81AA", category_explorer: "1" }],
    });
  });

  it("only includes params from paramsArray in paramObj", () => {
    const result = handleSetPrevUrl({
      prevUrl: [""],
      locationSearch: "?postcode=E81AA&unknown=foo&demographic=bar",
    });
    expect(result.prevUrlParamsArray[1]).toEqual({
      postcode: "E81AA",
      demographic: "bar",
    });
  });
});
