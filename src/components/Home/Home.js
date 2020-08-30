import React, { useEffect, useState, useContext } from "react";
// import { Router, Link } from "@reach/router";
import ListCategories from "../Category/ListCategories";
// import ListServices from "../Service/ListServices";
// import ServiceDetail from "../Service/ServiceDetail";
import { useQueryParams, NumberParam } from 'use-query-params';
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";

const Home = () => {
    const [url, setUrl] = useState("");
    const {urlParams, setUrlParams} = useContext(UrlContext);
    const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];

    const storeQuery = (e) => {
        let paramObj = {};
        const currentSearch = window.location.search;
        if (currentSearch) {
          setUrl(currentSearch); // ?postcode&service=7&service_search=1
  
          const queryParts = currentSearch.substring(1).split(/[&;]/g);
          const arrayLength = queryParts.length;
          for (let i = 0; i < arrayLength; i++) {
            const queryKeyValue = queryParts[i].split("=");
            if (paramsArray.includes(queryKeyValue[0])) {
              if (queryKeyValue[1]) {
                paramObj[queryKeyValue[0]] = queryKeyValue[1];
              }
            } 
          }
          setUrlParams(paramObj);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const handleEvent = e => {
        setQuery({ category_explorer: ~~ e }, 'pushIn')
        storeQuery();
    };

    // console.log('Home');
    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <div className="Home">
                <h1>Home</h1>
                <h2>-- Search component goes here --</h2>
                <ListCategories onClick={handleEvent} />
            </div>
        )
    )
}

export default Home;
