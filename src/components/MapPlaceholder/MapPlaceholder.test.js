import React from "react";
import { render, screen } from "@testing-library/react";
import MapPlaceholder from "./MapPlaceholder";

const mockUseMediaQuery = jest.fn(() => true);
jest.mock("react-responsive", () => ({
  useMediaQuery: (query) => mockUseMediaQuery(query),
}));

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer">TileLayer</div>,
  ZoomControl: () => <div data-testid="zoom-control">ZoomControl</div>,
}));

jest.mock(
  "../HackneyMap/MapResizeHandler",
  () =>
    function MapResizeHandler() {
      return null;
    },
);

jest.mock("../../util/styled-components/MapContainer", () => ({
  MapContainer: ({ children }) => (
    <div data-testid="styled-map-container">{children}</div>
  ),
}));

jest.mock("../../helpers/GlobalVariables/GlobalVariables", () => ({
  MAX_ZOOM: 18,
  MIN_ZOOM: 10,
  ZOOM: 12,
  CENTER_DESKTOP_LEGEND_FULLSCREEN: [51.5, -0.1],
  MAP_BOUNDS: [
    [51.4, -0.2],
    [51.6, 0],
  ],
  ATTRIBUTION: "© Mapbox",
}));

describe("MapPlaceholder", () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(true);
  });

  it("renders map container when desktop", () => {
    render(<MapPlaceholder />);
    expect(screen.getByTestId("styled-map-container")).toBeInTheDocument();
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
    expect(screen.getByTestId("zoom-control")).toBeInTheDocument();
  });

  it("renders nothing when not desktop", () => {
    mockUseMediaQuery.mockReturnValue(false);
    const { container } = render(<MapPlaceholder />);
    expect(container.firstChild).toBeNull();
  });
});
