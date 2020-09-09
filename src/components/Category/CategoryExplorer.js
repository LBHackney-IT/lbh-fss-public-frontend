import React, { useEffect, useState, useContext } from 'react';
import GetServices from "../../services/GetServices/GetServices";
import GetCategories from "../../services/GetCategories/GetCategories";
import { CardContainer } from "../../util/styled-components/CardContainer";
import ServiceCard from "../Service/ServiceCard";
import CategoryCard from "../Category/CategoryCard";
import Header from "../Header/Header";
import MapView from "../MapView/MapView";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import styled from "styled-components";
import { pink } from "../../settings/colors";
import arrowRight from "../../assets/arrow-right.svg";
import breakpoint from 'styled-components-breakpoint';

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
          <div>
            <Header />
          </div>
          <div>
            {`{Filters}`}
          </div>
          <CategoryCardContainer>
            <CategoryCard
              key={categoryData[0].id}
              category={categoryData[0]}
            />
          </CategoryCardContainer>
          <CardContainer>
            <MapView />
            {data.map(service => {
              return (
                <div>
                  <ServiceCard service={service} onClick={select} />
                </div>
              );
            })}
          </CardContainer>
        </div>
      )}
    </div>
  );

}


export default CategoryExplorer;