import React, { useEffect, useState, useContext } from 'react';
import GetServices from "../../services/GetServices/GetServices";
import ServiceCard from "./ServiceCard";
import { CardContainer } from "../../util/styled-components/CardContainer";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import Header from "../Header/Header";

const ListServices = ({ categories = [], onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {urlParams, setUrlParams} = useContext(UrlParamsContext);

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

  }, [setData, setIsLoading]);


  if (isLoading) {
    return <span>Loading</span>;
  }

  const select = e => {
    onClick(e);
  }
  // console.log("ListServices urlParams");
  // console.log(urlParams);

  // console.log("ListServices.js");
  return(
    <div>
      {!data.length ? (
        <h2>No data Found</h2>
      ) : (
        <div>
          <Header />
          <div>{`{Categories | Filters}`}</div>
          <CardContainer>
            <div>View as: {`{List | Map}`}</div>
            {data.map((service, index) => {
              return (
                <ServiceCard key={index} service={service} onClick={select} />
              );
            })}
          </CardContainer>
        </div>
      )}
    </div>
  );

}


export default ListServices;