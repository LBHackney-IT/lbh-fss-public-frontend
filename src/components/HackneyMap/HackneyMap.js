import { useState, useContext, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../Service/ServiceCard";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon, Map as LeafletMap } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import { ReactLeafletMarkerClusterStyles } from "../../helpers/Mapbox/ReactLeafletMarkerClusterStyles";
import MapResizeHandler from "./MapResizeHandler";
import getAllAddresses from "../../helpers/Mapbox/getAllAddresses";
import getHomeLocation from "../../helpers/Mapbox/getHomeLocation";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css";
import { getMapboxTileUrl } from "../../settings/mapboxTiles";

import {
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM,
  CENTER_DESKTOP_LEGEND_FULLSCREEN,
  MAP_BOUNDS,
  ATTRIBUTION,
} from "../../helpers/GlobalVariables/GlobalVariables";

LeafletMap.addInitHook("addHandler", "gestureHandling", GestureHandling);

const HackneyMap = (data) => {
  const { url, setUrl } = useContext(UrlContext);
  const { prevUrl, setPrevUrl } = useContext(PrevUrlContext);
  const { urlParams, setUrlParams } = useContext(UrlParamsContext);
  const { prevUrlParams, setPrevUrlParams } = useContext(PrevUrlParamsContext);
  const [isServiceDetail, setIsServiceDetail] = useState(false);
  const [setPage] = useState(null);
  const removeQuery = [
    "category_explorer",
    "postcode",
    "service_search",
    "categories",
    "demographic",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    for (const [key, value] of Object.entries(urlParams)) {
      if (key === "support_service" && value !== "") {
        setIsServiceDetail(true);
      } else {
        setIsServiceDetail(false);
      }
    }
  });

  const ServiceCardEvent = (e) => {
    const serviceArray = [];
    const urlArray = url.substring(1).split(/[&;]/g);
    let prevUrlArray = prevUrl;
    let prevUrlParamsArray = prevUrlParams;

    for (const [key, value] of Object.entries(urlParams)) {
      if (removeQuery.includes(key)) {
        if (value) {
          serviceArray.push(key + "=" + value);
        } else {
          serviceArray.push(key);
        }
      }
    }

    let newServiceUrl = urlArray.filter((val) => !serviceArray.includes(val)).join("&");
    if (newServiceUrl !== "") newServiceUrl = "&" + newServiceUrl;
    const updatedUrl = "?support_service=" + e;
    const newServiceObj = { support_service: e.toString() };
    navigate(updatedUrl);

    setUrl(updatedUrl);
    setPage("ServiceDetail");
    setUrlParams(newServiceObj);

    prevUrlArray.push(updatedUrl);
    setPrevUrl(prevUrlArray);

    prevUrlParamsArray.push(newServiceObj);
    setPrevUrlParams(prevUrlParamsArray);
  };

  return (
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
      <ReactLeafletMarkerClusterStyles />
      <ZoomControl position="topright" />
      <TileLayer attribution={ATTRIBUTION} url={getMapboxTileUrl()} />

      <MarkerClusterGroup>
        {getAllAddresses(data).map((service, index) => {
          if (!service.locations || !service.locations[0]) return null;

          const lat = parseFloat(service["locations"][0]["latitude"]);
          const lng = parseFloat(service["locations"][0]["longitude"]);

          if (isNaN(lat) || isNaN(lng)) return null;

          let categoryIconName = "";

          if (service.categories.length !== 0) {
            const categoriesSorted = service["categories"].sort(
              (a, b) => a.weight - b.weight,
            );
            categoryIconName = categoriesSorted[0].name
              .replaceAll(" ", "-")
              .toLowerCase();
          }

          const iconMarkup = renderToStaticMarkup(
            <div className="hackney-map-marker" data-category-icon={categoryIconName}>
              <FontAwesomeIcon
                icon={["fas", "location-dot"]}
                size="3x"
                className="map-marker--foreground"
              />
              <FontAwesomeIcon icon={["fas", "location-pin"]} size="3x" />
            </div>,
          );
          const customMarkerIcon = divIcon({ html: iconMarkup });
          const point = [lat, lng];

          return (
            <Marker position={point} key={index} icon={customMarkerIcon}>
              {!isServiceDetail && (
                <Popup>
                  <ServiceCard key={index} service={service} onClick={ServiceCardEvent} />
                </Popup>
              )}
            </Marker>
          );
        })}
      </MarkerClusterGroup>

      {getHomeLocation(data).map((location, index) => {
        if (location.postCodeLatitude === null || location.postCodeLongitude === null)
          return null;

        const iconMarkup = renderToStaticMarkup(
          <div className="hackney-map-home-marker">
            <FontAwesomeIcon icon={["fas", "map-marker"]} size="3x" />
            <FontAwesomeIcon
              icon={["fas", "map-marker"]}
              size="3x"
              className="map-marker--foreground"
            />
            <FontAwesomeIcon icon={["fas", "home"]} size="3x" />
          </div>,
        );
        const customMarkerIcon = divIcon({ html: iconMarkup });
        const point = [
          parseFloat(location.postCodeLatitude),
          parseFloat(location.postCodeLongitude),
        ];

        return <Marker position={point} key={index} icon={customMarkerIcon} />;
      })}
    </MapContainer>
  );
};

export default HackneyMap;
