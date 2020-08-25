import React, { useEffect, useState, useContext } from "react";
// import { Router, Link } from "@reach/router";
import ListCategories from "../Category/ListCategories";
// import ListServices from "../Service/ListServices";
// import ServiceDetail from "../Service/ServiceDetail";
import { useQueryParams, NumberParam } from 'use-query-params';
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";

const Home = () => {
    const {url, setUrl} = useContext(UrlContext);
    const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];

    const storeQuery = (e) => {
        let paramObj = {};
        const currentQueryString = window.location.search;
        if (currentQueryString) {
          const params = new URLSearchParams(window.location.search); 
          for (const [key, value] of params.entries()) {
            if (paramsArray.includes(key)) {
              if (value) {
                paramObj[key] = key;
                paramObj[value] = value;
              }
            }
          }
          setUrl(paramObj);
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
