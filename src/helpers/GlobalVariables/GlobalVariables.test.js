import {
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM,
  CENTER_DESKTOP_LEGEND_FULLSCREEN,
  CENTER_DESKTOP_LEGEND,
  CENTER_DESKTOP_NO_LEGEND_FULLSCREEN,
  CENTER_DESKTOP_NO_LEGEND,
  CENTER_MOBILE_FULLSCREEN,
  CENTER_MOBILE,
  DEFAULT_ZOOM_DESKTOP,
  DEFAULT_ZOOM_MOBILE,
  MAP_BOUNDS,
  HACKNEY_BOUNDS_1,
  HACKNEY_BOUNDS_2,
  HACKNEY_GEOSERVER_WMS,
  HACKNEY_GEOSERVER_WFS,
  MAPBOX_TILES_URL,
  GENERIC_GEOLOCATION_ERROR,
  GENERIC_OUTSIDE_HACKNEY_ERROR,
  ATTRIBUTION,
} from "./GlobalVariables";

describe("GlobalVariables", () => {
  it("exports zoom constants as numbers", () => {
    expect(typeof ZOOM).toBe("number");
    expect(typeof MAX_ZOOM).toBe("number");
    expect(typeof MIN_ZOOM).toBe("number");
    expect(MAX_ZOOM).toBe(19);
    expect(MIN_ZOOM).toBe(14);
    expect(ZOOM).toBe(14);
  });

  it("exports default zoom for desktop and mobile", () => {
    expect(DEFAULT_ZOOM_DESKTOP).toBe(13);
    expect(DEFAULT_ZOOM_MOBILE).toBe(11);
  });

  it("exports center coordinates as arrays of two numbers", () => {
    expect(CENTER_DESKTOP_LEGEND_FULLSCREEN).toEqual([51.534, -0.083]);
    expect(CENTER_DESKTOP_LEGEND).toEqual([51.548, -0.083]);
    expect(CENTER_MOBILE).toHaveLength(2);
    expect(typeof CENTER_MOBILE[0]).toBe("number");
    expect(typeof CENTER_MOBILE[1]).toBe("number");
  });

  it("exports MAP_BOUNDS as array of two coordinate pairs", () => {
    expect(MAP_BOUNDS).toHaveLength(2);
    expect(MAP_BOUNDS[0]).toEqual([51.281112, -0.6]);
    expect(MAP_BOUNDS[1]).toEqual([51.793054, 0.45]);
  });

  it("exports Hackney bounds", () => {
    expect(HACKNEY_BOUNDS_1).toHaveLength(2);
    expect(HACKNEY_BOUNDS_2).toHaveLength(2);
  });

  it("exports geoserver URLs as strings", () => {
    expect(HACKNEY_GEOSERVER_WMS).toContain("hackney.gov.uk");
    expect(HACKNEY_GEOSERVER_WFS).toContain("GetFeature");
  });

  it("exports MAPBOX_TILES_URL as string", () => {
    expect(typeof MAPBOX_TILES_URL).toBe("string");
    expect(MAPBOX_TILES_URL).toContain("mapbox.com");
  });

  it("exports error messages", () => {
    expect(GENERIC_GEOLOCATION_ERROR).toContain("location");
    expect(GENERIC_OUTSIDE_HACKNEY_ERROR).toContain("Hackney");
  });

  it("exports ATTRIBUTION with expected content", () => {
    expect(ATTRIBUTION).toContain("OpenStreetMap");
    expect(ATTRIBUTION).toContain("mapbox");
  });
});
