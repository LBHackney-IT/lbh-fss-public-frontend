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
import { divIcon } from "leaflet";

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
            <Map center={position} zoom={14} zoomControl={false}>
              <ZoomControl position='topright' />
              {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              /> */}
              <TileLayer
                  attribution='Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>'
                  url="https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FtbnVkZ2UiLCJhIjoiY2tmNWU1bm91MG02bzJxcDk1bDc4djEwcSJ9.jXBC4VWPmozpPfOpAbaq4Q"
              />
              {
                data.map((service, index) => {
                  const point = [parseFloat(service['locations'][0]['latitude']), parseFloat(service['locations'][0]['longitude'])];

                  const categoriesSorted = service["categories"].sort(function (a, b) {
                    return a.weight - b.weight;
                  });
                  const categoryIconName = categoriesSorted[0].name.replaceAll(" ", "-").toLowerCase();
                  const iconMarkup = renderToStaticMarkup(
                    <div className="hackney-map-marker">
                      <i className=" fa fa-map-marker-alt fa-3x" data-category-icon={categoryIconName} />
                      <i className=" fa fa-map-marker fa-3x" />
                    </div>
                  );
                  const customMarkerIcon = divIcon({
                    html: iconMarkup
                  });

                  return (
                    <Marker position={point} key={service['id']} icon={customMarkerIcon} >
                      <Popup>
                        <ServiceCard key={index} service={service} onClick={select} />
                      </Popup>
                    </Marker>
                  )
                })
              }
            </Map>
          </MapContainer>
        </div>
      )}
    </div>
  );

}


export default CategoryExplorer;