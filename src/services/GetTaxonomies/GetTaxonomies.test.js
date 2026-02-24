import axios from "axios";
import GetTaxonomies from "./GetTaxonomies";

jest.mock("axios");
jest.mock("../BaseApiUrl/BaseApiUrl", () => "https://api.example.com/v1");

describe("GetTaxonomies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("retrieveTaxonomies", () => {
    it("fetches taxonomies and returns taxonomies array", async () => {
      const mockTaxonomies = [{ id: "1", name: "Category A" }];
      axios.get.mockResolvedValue({ data: { taxonomies: mockTaxonomies } });

      const result = await GetTaxonomies.retrieveTaxonomies({
        sort: "weight",
        direction: "asc",
        vocabulary: "categories",
      });

      expect(axios.get).toHaveBeenCalledWith("https://api.example.com/v1/taxonomies", {
        params: { sort: "weight", direction: "asc", vocabulary: "categories" },
      });
      expect(result).toEqual(mockTaxonomies);
    });

    it("returns empty taxonomies object on error", async () => {
      axios.get.mockRejectedValue(new Error("Network error"));

      const result = await GetTaxonomies.retrieveTaxonomies({});

      expect(result).toEqual({ taxonomies: [] });
    });
  });

  describe("getTaxonomy", () => {
    it("fetches single taxonomy by id and returns response data", async () => {
      const mockTaxonomy = { id: "1", name: "Category A" };
      axios.get.mockResolvedValue({ data: mockTaxonomy });

      const result = await GetTaxonomies.getTaxonomy("1");

      expect(axios.get).toHaveBeenCalledWith("https://api.example.com/v1/taxonomies/1", {});
      expect(result).toEqual(mockTaxonomy);
    });

    it("returns empty object on error", async () => {
      axios.get.mockRejectedValue(new Error("Not found"));

      const result = await GetTaxonomies.getTaxonomy("999");

      expect(result).toEqual({});
    });
  });
});
