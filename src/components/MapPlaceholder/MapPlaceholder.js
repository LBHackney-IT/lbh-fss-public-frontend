import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { useMediaQuery } from 'react-responsive';
import {MapContainer} from "../../util/styled-components/MapContainer";
import { Map, TileLayer, ZoomControl } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { GestureHandling } from 'leaflet-gesture-handling';
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.min.js";
import {
    MAX_ZOOM,
    MIN_ZOOM,
    CENTER_DESKTOP_LEGEND,
    CENTER_DESKTOP_LEGEND_FULLSCREEN,
    CENTER_DESKTOP_NO_LEGEND,
    CENTER_DESKTOP_NO_LEGEND_FULLSCREEN,
    CENTER_MOBILE,
    CENTER_MOBILE_FULLSCREEN,
    DEFAULT_ZOOM_DESKTOP,
    DEFAULT_ZOOM_MOBILE,
    MAP_BOUNDS,
    HACKNEY_BOUNDS_1,
    HACKNEY_BOUNDS_2,
    HACKNEY_GEOSERVER_WMS,
    MAPBOX_TILES_URL,
    GENERIC_GEOLOCATION_ERROR,
    GENERIC_OUTSIDE_HACKNEY_ERROR,
    ATTRIBUTION
} from "../../helpers/GlobalVariables/GlobalVariables";

LeafletMap.addInitHook('addHandler', 'gestureHandling', GestureHandling);

const MapPlaceholder = () => {

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 768 })
        return isDesktop ? children : null
    }

    return (
        <Desktop>
            <MapContainer>
                <Map className="markercluster-map"
                    bounds={MAP_BOUNDS}
                    maxBounds={MAP_BOUNDS}
                    center={CENTER_DESKTOP_LEGEND_FULLSCREEN}
                    zoom={MIN_ZOOM}
                    minZoom={MIN_ZOOM}
                    maxZoom={MAX_ZOOM}
                    zoomControl={false}
                    dragging={false}
                    tap={false}
                    scrollWheelZoom={false}
                    bounceAtZoomLimits={false}
                    gestureHandling
                >
                    <ZoomControl position='topright' />
                    <TileLayer
                        attribution={ATTRIBUTION}
                        url={MAPBOX_TILES_URL}
                    />
                </Map>
            </MapContainer>
        </Desktop>
    );
}

export default MapPlaceholder;