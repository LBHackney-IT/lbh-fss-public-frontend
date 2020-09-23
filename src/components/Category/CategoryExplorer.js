import React, { useEffect, useState, useContext } from 'react';
import GetServices from "../../services/GetServices/GetServices";
import GetCategories from "../../services/GetCategories/GetCategories";
import { CardContainer } from "../../util/styled-components/CardContainer";
import ServiceCard from "../Service/ServiceCard";
import CategoryCard from "../Category/CategoryCard";
import Header from "../Header/Header";
import MapView from "../MapView/MapView";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import styled from "styled-components";
import ServiceFilter from '../ServiceFilter/ServiceFilter';
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

export const CategoryCardContainer = styled.div`
  .card {
    box-shadow: none;
    border: 0;
    cursor: auto;
    .card--container {
      &::after {
          content: none;
      }
    }
    .card--content {
      margin-right: 0;
    }
  }
`;

const CategoryExplorer = ({ category, onClick }) => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {urlParams} = useContext(UrlParamsContext);
  const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
  const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
  const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
  const currentSearch = window.location.search;
  let paramObj = {};
  const position = [51.517787, -0.097059];

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
      let categoryId = "";
      if (Object.entries(urlParams)[0] && Object.entries(urlParams)[0][0] == "category_explorer" && Object.entries(urlParams)[0][1] !== "") {
        categoryId = parseInt(Object.entries(urlParams)[0][1]);
      }
      // call retrieveServicesByCategory with categoryId param passed to return all services associated with the category
      const getServices = await GetServices.retrieveServicesByCategory({taxonomyId: categoryId});
      setData(getServices || []);
      // call retrieveCategories with categoryId param passed to return the category name and description
      const getCategories = await GetCategories.retrieveCategories({id: categoryId});
      setCategoryData(getCategories || []);
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

  }, [setData, setCategoryData, setIsLoading]);

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
          <CategoryCardContainer>
            <CategoryCard
              key={categoryData[0].id}
              category={categoryData[0]}
            />
          </CategoryCardContainer>
          <CardContainer>
            <MapView />
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


export default CategoryExplorer;