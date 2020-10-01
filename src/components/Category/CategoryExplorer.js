import React, { useEffect, useState, useContext } from 'react';
import GetServices from "../../services/GetServices/GetServices";
import GetTaxonomies from "../../services/GetTaxonomies/GetTaxonomies";
import { CardContainer } from "../../util/styled-components/CardContainer";
import ServiceCard from "../Service/ServiceCard";
import CategoryCard from "../Category/CategoryCard";
import Header from "../Header/Header";
import ToggleView from "../ToggleView/ToggleView";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import MapToggleContext from "../../context/MapToggleContext/MapToggleContext";
import styled from "styled-components";
import ServiceFilter from '../ServiceFilter/ServiceFilter';
import {MapContainer} from "../../util/styled-components/MapContainer";
import HackneyMap from "../HackneyMap/HackneyMap";
import { useMediaQuery } from 'react-responsive';

export const CategoryCardContainer = styled.div`
  .fss--card {
    box-shadow: none;
    border: 0;
    cursor: auto;
    margin-bottom: 0;
    .fss--card--container {
      padding: 20px 15px;
      &::after {
          content: none;
      }
    }
    .fss--card--content {
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
  const {mapToggle, setMapToggle} = useContext(MapToggleContext);
  const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
  const currentSearch = window.location.search;
  let paramObj = {};
  const [showMap, setShowMap] = useState("false");
  const [fetchOnce, setfetchOnce] = useState(false);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    return isDesktop ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }

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
      // call retrieveServices with categoryId param passed to return all services associated with the category
      const getServices = await GetServices.retrieveServices({taxonomyids: categoryId});
      setData(getServices || []);
      // call getTaxonomy with categoryId param passed to return the category name and description
      const getCategories = await GetTaxonomies.getTaxonomy(categoryId);
      setCategoryData(getCategories || []);
      setIsLoading(false);
    }
    if (fetchOnce == false) {
      fetchData();
      setfetchOnce(true);
    }
    
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

    if (mapToggle === "true") {
      setShowMap("true");
    } else {
      setShowMap("false");
    }

  });

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
              key={categoryData.id}
              category={categoryData}
            />
          </CategoryCardContainer>
          <Mobile>
            <ToggleView />
            {
              ( showMap == "false" ) ?
                <CardContainer>
                  {data.map((service, index) => {
                    return (
                      <ServiceCard key={index} service={service} onClick={select} />
                    );
                  })}
                </CardContainer> : ""
            }
          </Mobile>
          <Desktop>
            <CardContainer>
              {data.map((service, index) => {
                return (
                  <ServiceCard key={index} service={service} onClick={select} />
                );
              })}
            </CardContainer>
          </Desktop>
          <Mobile>
          {
            ( showMap == "true" ) ?
              <MapContainer>
                <HackneyMap data={data} />
              </MapContainer> : ""
          }
          </Mobile>
          <Desktop>
            <MapContainer>
              <HackneyMap data={data} />
            </MapContainer>
          </Desktop>
        </div>
      )}
    </div>
  );

}


export default CategoryExplorer;