import React, { useState, useContext, useEffect, useMemo } from "react";
import CategoryExplorer from "../Category/CategoryExplorer";
import ListServices from "../Service/ListServices";
import ServiceDetail from "../Service/ServiceDetail";
import SetPostcode from "../Postcode/SetPostcode";
import SelectCategories from "../SelectCategories/SelectCategories";
import SelectDemographics from "../SelectDemographics/SelectDemographics";
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import ServiceSearchProcess from '../ServiceSearch/ServiceSearchProcess';
import Home from "../Home/Home";
import { useQueryParams, NumberParam } from 'use-query-params';
import history from '../../history';

const RouteContainer = (props) => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [{ service }, setQuery] = useQueryParams({ service: NumberParam });
    const removeQuery = ["category_explorer", "postcode", "service_search", "categories", "demographic"];
    const paramsArray = [...removeQuery, "service"];

    useEffect(() => {
        async function checkQuery() {
            for (const [key, value] of Object.entries(urlParams)) {
                if (key == "category_explorer" && value !== "") {
                    setPage("CategoryExplorer");
                } else if (key == "service" && value !== "") {
                    setPage("ServiceDetail");
                } else if (key == "postcode" && value !== "" || key == "service_search" && value !== "") {
                    setPage("ListServices");
                } else if (key == "service_search_process" && value == "true") {
                    setPage("ServiceSearchProcess");
                } else if (key == "set_postcode" && value == "true") {
                    setPage("SetPostcode");
                } else if (key == "select_categories" && value == "true") {
                    setPage("SelectCategories");
                } else if (key == "select_demographics" && value == "true") {
                    setPage("SelectDemographics");
                }
            }
        }
        checkQuery();
        setIsLoading(false);
    });

    const ServiceCardEvent = e => {
        const serviceArray = [];
        const urlArray = url.substring(1).split(/[&;]/g);
        let prevUrlArray = prevUrl;
        let prevUrlParamsArray = prevUrlParams;

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
        const updatedUrl = "?service=" + e;
        const newServiceObj = {service: e.toString()};
        history.push(updatedUrl);

        setUrl(updatedUrl);
        setPage("ServiceDetail");
        setUrlParams(newServiceObj);

        prevUrlArray.push(updatedUrl);
        setPrevUrl(prevUrlArray);

        // setPrevUrlParams
        prevUrlParamsArray.push(newServiceObj);
        setPrevUrlParams(prevUrlParamsArray);
    };

    return (
        isLoading ? ( <AppLoading /> ) :
        (
            ( page == "CategoryExplorer" ) ? <CategoryExplorer onClick={ ServiceCardEvent} /> :
            ( page == "ServiceDetail" ) ? <ServiceDetail service={service} /> :
            ( page == "ServiceSearchProcess") ? <ServiceSearchProcess /> :
            ( page == "ListServices") ? <ListServices onClick={ ServiceCardEvent} /> :
            ( page == "SetPostcode") ? <SetPostcode /> :
            ( page == "SelectCategories") ? <SelectCategories /> :
            ( page == "SelectDemographics") ? <SelectDemographics /> :
            <Home />
        )   
    )
}

export default RouteContainer;