import React, { useEffect, useState } from 'react';
import GetServices from "../../services/GetServices/GetServices";
import ServiceCard from "./ServiceCard";
import { CardContainer } from "../../util/styled-components/CardContainer";
import Header from "../Header/Header";

const ListServices = ({ categories = [], onClick }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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


export default ListServices;