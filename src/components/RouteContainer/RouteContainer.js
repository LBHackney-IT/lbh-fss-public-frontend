import React, { useState, useContext, useEffect, useMemo } from "react";
import CategoryExplorer from "../Category/CategoryExplorer";
import ListServices from "../Service/ListServices";
import ServiceDetail from "../Service/ServiceDetail";
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import Home from "../Home/Home";
import { useQueryParams, NumberParam } from 'use-query-params';
import history from '../../history';

const RouteContainer = (props) => {
    // const { url } = props;
    const {url, setUrl} = useContext(UrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [{ service }, setQuery] = useQueryParams({ service: NumberParam });
    const removeQuery = ["category_explorer", "postcode", "service_search"];

    useEffect(() => {
        async function checkQuery() {
            for (const [key, value] of Object.entries(urlParams)) {
                if (key == "category_explorer" && value !== "") {
                    // console.log("CategoryExplorer");
                    setPage("CategoryExplorer");
                } else if (key == "service" && value !== "") {
                    // console.log("ServiceDetail");
                    setPage("ServiceDetail");
                } else if (key == "postcode" && value !== "" || key == "service_search" && value !== "") {
                    // console.log("ListServices");
                    setPage("ListServices");
                }
            }
        }
        checkQuery();
        setIsLoading(false);
    });

    const handleEvent = e => {
        const serviceArray = [];
        const urlArray = url.substring(1).split(/[&;]/g);
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
        const updatedUrl = "?service=" + e + newServiceUrl;
        history.push(updatedUrl);
        setUrl(updatedUrl);
        setPage("ServiceDetail");
        setUrlParams({service: e.toString()});
    };

    // console.log("RouteContainer");
    // console.log(back);
    // console.log(backValue);
    // console.log("/RouteContainer");
    return (
        isLoading ? ( <AppLoading /> ) :
        (
            ( page == "CategoryExplorer" ) ? <CategoryExplorer onClick={ handleEvent} /> :
            ( page == "ServiceDetail" ) ? <ServiceDetail service={service} /> :
            ( page == "ListServices") ? <ListServices onClick={ handleEvent} /> :
            <Home />
        )   
    )
}

export default RouteContainer;