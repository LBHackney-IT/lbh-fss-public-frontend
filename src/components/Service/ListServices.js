import React, { useEffect, useState, useContext } from 'react';
import GetServices from "../../services/GetServices/GetServices";
import ServiceCard from "./ServiceCard";
import { CardContainer } from "../../util/styled-components/CardContainer";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import Header from "../Header/Header";
import ServiceFilter from '../ServiceFilter/ServiceFilter';
import styled from "styled-components";
import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import {MapContainer} from "../../util/styled-components/MapContainer";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon, Map as LeafletMap } from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MarkerClusterGroup from "react-leaflet-markercluster";
import getAllAddresses from "../../helpers/Mapbox/getAllAddresses";
import { GestureHandling } from 'leaflet-gesture-handling';
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

const ListServices = ({ onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {urlParams, setUrlParams} = useContext(UrlParamsContext);
  const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
  const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
  const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
  const currentSearch = window.location.search;
  let paramObj = {};
  LeafletMap.addInitHook('addHandler', 'gestureHandling', GestureHandling);

  function createParamObj(currentSearch, paramsArray) {
    const queryParts = currentSearch.substring(1).split(/[&;]/g);
    const arrayLength = queryParts.length;
    for (let i = 0; i < arrayLength; i++) {
      const queryKeyValue = queryParts[i].split("=");
      if (paramsArray.includes(queryKeyValue[0])) {
        paramObj[queryKeyValue[0]] = queryKeyValue[1];
      } 
    }
  }

  useEffect(() => {
    async function fetchData() {
      // get urlParams and pass in postcode and search values
      // searchValue.replace("%20", "+"); // don't do this for postcode
      // const getServices = await GetServices.retrieveServices({postcode: value, search: value});
      const getServices = await GetServices.retrieveServices({});
      setData(getServices || []);
      setIsLoading(false);
    }
    fetchData();

    if (prevUrl.length == 0 && prevUrlParams.length == 0) {
      let prevUrlArray = [""];
      let prevUrlParamsArray = [{}];

      // setPrevUrl
      if (currentSearch) {
        prevUrlArray.push(currentSearch);
        setPrevUrl(prevUrlArray);
      }

      // setPrevUrlParams
      createParamObj(currentSearch, paramsArray);
      prevUrlParamsArray.push(paramObj);
      setPrevUrlParams(prevUrlParamsArray);
    }

  }, [setData, setIsLoading]);

  if (isLoading) {
    return <span>Loading</span>;
  }

  const select = e => {
    onClick(e);
  }

  return(
    <div>
      {!data.length ? (
        <h2>No data Found</h2>
      ) : (
        <div>
          <Header />
          <ServiceFilter />
          <CardContainer>
            <div>View as: {`{List | Map}`}</div>
            {data.map((service, index) => {
              return (
                <ServiceCard key={index} service={service} onClick={select} />
              );
            })}
          </CardContainer>
          <MapContainer>
            <Map className="markercluster-map"
              center={CENTER_DESKTOP_LEGEND_FULLSCREEN}
              zoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
              zoomControl={false}
              // bounds={MAP_BOUNDS}
              maxBounds={MAP_BOUNDS}
              gestureHandling
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
                      <Popup>
                        <ServiceCard key={index} service={service} onClick={select} />
                      </Popup>
                    </Marker>
                  )
                })
              }
              </MarkerClusterGroup>
            </Map>
          </MapContainer>
        </div>
      )}
    </div>
  );

}


export default ListServices;