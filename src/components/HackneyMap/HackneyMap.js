import React, { useState, useContext, useEffect, useMemo } from "react";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { useQueryParams, NumberParam } from 'use-query-params';
import history from '../../history';
import ServiceCard from "../Service/ServiceCard";
import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon, Map as LeafletMap } from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MarkerClusterGroup from "react-leaflet-markercluster";
import getAllAddresses from "../../helpers/Mapbox/getAllAddresses";
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

const HackneyMap = (data) => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isServiceDetail, setIsServiceDetail] = useState(false);
    const [page, setPage] = useState(null);
    const [{ service }, setQuery] = useQueryParams({ service: NumberParam });
    const removeQuery = ["category_explorer", "postcode", "service_search", "categories", "demographic"];
    const paramsArray = [...removeQuery, "service"];
    LeafletMap.addInitHook('addHandler', 'gestureHandling', GestureHandling);

    useEffect(() => {
        for (const [key, value] of Object.entries(urlParams)) {
            if (key == "service" && value !== "") {
                setIsServiceDetail(true);
            } else {
                setIsServiceDetail(false);
            }
        }
    })

    const ServiceCardEvent = e => {
        const serviceArray = [];
        const urlArray = url.substring(1).split(/[&;]/g);
        let prevUrlArray = prevUrl;
        let prevUrlParamsArray = prevUrlParams;

        for (const [key, value] of Object.entries(urlParams)) {
            if (removeQuery.includes(key)) {
                if (value) {
                    const urlParamsString = key + "=" + value;
                    serviceArray.push(urlParamsString);
                } else {
                    const urlParamsString = key;
                    serviceArray.push(urlParamsString);
                }
            }
        }

        let newServiceUrl = urlArray.filter(val => !serviceArray.includes(val)).join("&");
        if (newServiceUrl !== "") newServiceUrl = "&" + newServiceUrl;
        const updatedUrl = "?service=" + e;
        const newServiceObj = {service: e.toString()};
        history.push(updatedUrl);

        setUrl(updatedUrl);
        setPage("ServiceDetail");
        setUrlParams(newServiceObj);

        prevUrlArray.push(updatedUrl);
        setPrevUrl(prevUrlArray);

        // setPrevUrlParams
        prevUrlParamsArray.push(newServiceObj);
        setPrevUrlParams(prevUrlParamsArray);
    };

 return (
    <Map className="markercluster-map"
        center={CENTER_DESKTOP_LEGEND_FULLSCREEN}
        zoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoomControl={false}
        // bounds={MAP_BOUNDS}
        maxBounds={MAP_BOUNDS}
        gestureHandling={true}
    >
        <ZoomControl position='topright' />
        <TileLayer
            attribution={ATTRIBUTION}
            url={MAPBOX_TILES_URL}
        />
        <MarkerClusterGroup>
        {
        getAllAddresses(data).map((service, index) => {
            
            const categoriesSorted = service["categories"].sort(function (a, b) {
                return a.weight - b.weight;
            });

            const categoryIconName = categoriesSorted[0].name.replaceAll(" ", "-").toLowerCase();

            const iconMarkup = renderToStaticMarkup(
            <div className="hackney-map-marker" data-category-icon={categoryIconName}>
                <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="3x" />
                <FontAwesomeIcon icon={["fas", "map-marker"]} size="3x" />
            </div>
            );
            const customMarkerIcon = divIcon({
            html: iconMarkup
            });

            const point = [parseFloat(service["locations"][0]['latitude']), parseFloat(service["locations"][0]['longitude'])];
            
            return (
            <Marker position={point} key={index} icon={customMarkerIcon}>
                {
                    (isServiceDetail == false) ?
                        <Popup>
                            <ServiceCard key={index} service={service} onClick={ServiceCardEvent} />
                        </Popup> : ""
                }
            </Marker>
            )
        })
        }
        </MarkerClusterGroup>
    </Map>
 );
}

export default HackneyMap;