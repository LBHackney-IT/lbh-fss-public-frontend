import "leaflet/dist/leaflet.css";
import { useMediaQuery } from "react-responsive";
import { MapContainer as StyledMapContainer } from "../../util/styled-components/MapContainer";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import MapResizeHandler from "../HackneyMap/MapResizeHandler";
import L from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css";
import {
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM,
  CENTER_DESKTOP_LEGEND_FULLSCREEN,
  MAP_BOUNDS,
  ATTRIBUTION,
} from "../../helpers/GlobalVariables/GlobalVariables";
import { getMapboxTileUrl } from "../../settings/mapboxTiles";

L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

const MapPlaceholder = () => {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };

  return (
    <Desktop>
      <StyledMapContainer>
        <MapContainer
          className="markercluster-map"
          bounds={MAP_BOUNDS}
          maxBounds={MAP_BOUNDS}
          center={CENTER_DESKTOP_LEGEND_FULLSCREEN}
          zoom={ZOOM}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          gestureHandling={false}
        >
          <MapResizeHandler />
          <ZoomControl position="topright" />
          <TileLayer attribution={ATTRIBUTION} url={getMapboxTileUrl()} />
        </MapContainer>
      </StyledMapContainer>
    </Desktop>
  );
};

export default MapPlaceholder;
