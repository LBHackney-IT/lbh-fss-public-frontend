import axios from "axios";
import GetServices from "./GetServices";

jest.mock("axios");
jest.mock("../BaseApiUrl/BaseApiUrl", () => "https://api.example.com/v1");

describe("GetServices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("retrieveServices", () => {
    it("fetches services and returns response data", async () => {
      const mockData = { services: [{ id: "1", name: "Service A" }] };
      axios.get.mockResolvedValue({ data: mockData });

      const result = await GetServices.retrieveServices({
        search: "test",
        offset: 0,
        taxonomyids: [["1"]],
        limit: 10,
        postcode: "E81AA",
      });

      expect(axios.get).toHaveBeenCalledWith(
        "https://api.example.com/v1/services",
        expect.objectContaining({
          params: expect.objectContaining({
            search: "test",
            offset: 0,
            limit: 10,
            postcode: "E81AA",
          }),
        }),
      );
      expect(result).toEqual(mockData);
    });

    it("returns empty services on error", async () => {
      axios.get.mockRejectedValue(new Error("Network error"));

      const result = await GetServices.retrieveServices({
        search: "",
        offset: 0,
        taxonomyids: [],
        limit: 0,
        postcode: "",
      });

      expect(result).toEqual({ services: [] });
    });

    it("sends taxonomyids as single string when length 1 and no plus", async () => {
      axios.get.mockResolvedValue({ data: { services: [] } });

      await GetServices.retrieveServices({
        search: "",
        offset: 0,
        taxonomyids: ["42"],
        limit: 0,
        postcode: "",
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            taxonomyids: "42",
          }),
        }),
      );
    });

    it("sends taxonomyids as array when length 1 and value contains plus", async () => {
      axios.get.mockResolvedValue({ data: { services: [] } });

      await GetServices.retrieveServices({
        search: "",
        offset: 0,
        taxonomyids: ["1+2+3"],
        limit: 0,
        postcode: "",
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            taxonomyids: ["1", "2", "3"],
          }),
        }),
      );
    });

    it("sends taxonomyids from nested array when length 1 and element is array", async () => {
      axios.get.mockResolvedValue({ data: { services: [] } });

      await GetServices.retrieveServices({
        search: "",
        offset: 0,
        taxonomyids: [["1", "2"]],
        limit: 0,
        postcode: "",
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            taxonomyids: ["1", "2"],
          }),
        }),
      );
    });

    it("sends combined categories and demographics when length > 1", async () => {
      axios.get.mockResolvedValue({ data: { services: [] } });

      await GetServices.retrieveServices({
        search: "",
        offset: 0,
        taxonomyids: ["cat1", "demo1"],
        limit: 0,
        postcode: "",
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            taxonomyids: ["cat1", "demo1"],
          }),
        }),
      );
    });

    it("sends joined arrays when length > 1 and elements are arrays", async () => {
      axios.get.mockResolvedValue({ data: { services: [] } });

      await GetServices.retrieveServices({
        search: "",
        offset: 0,
        taxonomyids: [["a", "b"], ["c"]],
        limit: 0,
        postcode: "",
      });

      const call = axios.get.mock.calls[0][1];
      expect(call.params.taxonomyids).toEqual(["a", "b", "c"]);
    });
  });

  describe("getService", () => {
    it("fetches single service by id and returns response data", async () => {
      const mockService = { id: "1", name: "Service A", demographic: [] };
      axios.get.mockResolvedValue({ data: mockService });

      const result = await GetServices.getService({ id: "1", postcode: "E81AA" });

      expect(axios.get).toHaveBeenCalledWith("https://api.example.com/v1/services/1", {
        params: { postcode: "E81AA" },
      });
      expect(result).toEqual(mockService);
    });

    it("returns default service with empty demographic on error", async () => {
      axios.get.mockRejectedValue(new Error("Not found"));

      const result = await GetServices.getService({ id: "999" });

      expect(result).toEqual({ service: { demographic: [] } });
    });
  });
});
