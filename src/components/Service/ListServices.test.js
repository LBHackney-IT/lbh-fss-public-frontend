import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ListServices from "./ListServices";
import GetServices from "../../services/GetServices/GetServices";

jest.mock("styled-components-breakpoint", () => () => () => "");
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import MapToggleContext from "../../context/MapToggleContext/MapToggleContext";

jest.mock("../../services/GetServices/GetServices", () => ({
  retrieveServices: jest.fn(),
}));
jest.mock("react-responsive", () => ({
  useMediaQuery: () => true,
}));
jest.mock("../Header/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("../ServiceFilter/ServiceFilter", () => () => <div data-testid="service-filter">Filter</div>);
jest.mock("../ToggleView/ToggleView", () => () => null);
jest.mock("../ServiceSearch/ServiceSearch", () => () => <div data-testid="service-search">Search</div>);
jest.mock("../HackneyMap/HackneyMap", () => () => <div data-testid="hackney-map">Map</div>);
jest.mock("../MapPlaceholder/MapPlaceholder", () => () => <div data-testid="map-placeholder">MapPlaceholder</div>);
jest.mock("../../util/functions/handleSetPrevUrl", () => ({
  handleSetPrevUrl: jest.fn(() => null),
}));
jest.mock("./ServiceCard", () => ({ service, onClick }) => (
  <div data-testid={`service-card-${service.id}`}>
    {service.name}
    <button type="button" onClick={() => onClick(service.id)}>
      Select
    </button>
  </div>
));

const defaultContext = {
  urlParams: {},
  prevUrl: [""],
  setPrevUrl: jest.fn(),
  prevUrlParams: [{}],
  setPrevUrlParams: jest.fn(),
  mapToggle: "false",
};

const renderWithContext = (contextOverrides = {}) => {
  const ctx = { ...defaultContext, ...contextOverrides };
  return render(
    <UrlParamsContext.Provider value={{ urlParams: ctx.urlParams }}>
      <PrevUrlContext.Provider value={{ prevUrl: ctx.prevUrl, setPrevUrl: ctx.setPrevUrl }}>
        <PrevUrlParamsContext.Provider
          value={{ prevUrlParams: ctx.prevUrlParams, setPrevUrlParams: ctx.setPrevUrlParams }}
        >
          <MapToggleContext.Provider value={{ mapToggle: ctx.mapToggle }}>
            <ListServices onClick={jest.fn()} />
          </MapToggleContext.Provider>
        </PrevUrlParamsContext.Provider>
      </PrevUrlContext.Provider>
    </UrlParamsContext.Provider>,
  );
};

describe("ListServices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls GetServices.retrieveServices with postcode and search from urlParams", async () => {
    GetServices.retrieveServices.mockResolvedValue({ services: [] });
    renderWithContext({
      urlParams: { postcode: "E81AA", service_search: "youth" },
    });
    await waitFor(() => {
      expect(GetServices.retrieveServices).toHaveBeenCalledWith(
        expect.objectContaining({
          postcode: "E81AA",
          search: "youth",
          taxonomyids: [],
        }),
      );
    });
  });

  it("calls GetServices.retrieveServices with taxonomyids when categories/demographic in urlParams", async () => {
    GetServices.retrieveServices.mockResolvedValue({ services: [] });
    renderWithContext({
      urlParams: { categories: "1", demographic: "2" },
    });
    await waitFor(() => {
      expect(GetServices.retrieveServices).toHaveBeenCalledWith(
        expect.objectContaining({
          taxonomyids: ["1", "2"],
        }),
      );
    });
  });

  it("shows No results found when retrieveServices returns empty services", async () => {
    GetServices.retrieveServices.mockResolvedValue({ services: [] });
    renderWithContext({ urlParams: { service_search: "x" } });
    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
    expect(screen.getByText(/Please use the 'Back' button/)).toBeInTheDocument();
  });

  it("renders service cards when retrieveServices returns services", async () => {
    GetServices.retrieveServices.mockResolvedValue({
      services: [
        { id: "1", name: "Service A", description: "Desc", images: null, locations: [{ distance: "1 mile" }] },
      ],
    });
    renderWithContext({ urlParams: { service_search: "test" } });
    const serviceLabels = await screen.findAllByText("Service A", {}, { timeout: 3000 });
    expect(serviceLabels.length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByTestId("service-card-1").length).toBeGreaterThanOrEqual(1);
  });
});
