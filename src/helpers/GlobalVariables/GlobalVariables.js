import MAPBOX_ACCESS_TOKEN from "../Mapbox/Mapbox";

const MAX_ZOOM = 19;
const MIN_ZOOM = 13;
const CENTER_DESKTOP_LEGEND_FULLSCREEN = [51.534, -0.083];
const CENTER_DESKTOP_LEGEND = [51.548, -0.083];
const CENTER_DESKTOP_NO_LEGEND_FULLSCREEN = [51.534, -0.06];
const CENTER_DESKTOP_NO_LEGEND = [51.548, -0.06];
const CENTER_MOBILE_FULLSCREEN = [51.538, -0.059928];
const CENTER_MOBILE = [51.549, -0.059928];
const DEFAULT_ZOOM_DESKTOP = 13;
const DEFAULT_ZOOM_MOBILE = 11;
const MAP_BOUNDS = [
  [51.281112, -0.5],
  [51.793054, 0.45]
];
const HACKNEY_BOUNDS_1 = [51.517787, -0.097059];
const HACKNEY_BOUNDS_2 = [51.580648, -0.00909];

const HACKNEY_GEOSERVER_WFS = "https://map.hackney.gov.uk/geoserver/ows?service=WFS&version=2.0&request=GetFeature&outputFormat=json&SrsName=EPSG:4326&typeName=";
const HACKNEY_GEOSERVER_WMS = "https://map.hackney.gov.uk/geoserver/wms";
// const MAPBOX_TILES_URL = "https://api.mapbox.com/styles/v1/samnudge/ckf5pfyrj2ua819ld0f4yq4hk/tiles/256/{z}/{x}/{y}@2x?access_token="+MAPBOX_ACCESS_TOKEN;
const MAPBOX_TILES_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const MAPBOX_TILES_URL = "https://api.mapbox.com/styles/v1/hackneygis/ck7ounc2t0cg41imjb3j53dp8/tiles/256/{z}/{x}/{y}@2x?access_token="+MAPBOX_ACCESS_TOKEN;
const GENERIC_GEOLOCATION_ERROR =
  "We cannot find your location. Please enable Location Services for your browser in Settings or try again outside of your office as your network may block geolocation.";
const GENERIC_OUTSIDE_HACKNEY_ERROR = "This map only covers Hackney";
const ATTRIBUTION = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>';

export {
    MAX_ZOOM,
    MIN_ZOOM,
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
  };
  