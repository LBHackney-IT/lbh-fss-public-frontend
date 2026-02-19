import React, { useState, useContext, useEffect } from "react";
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
import { useNavigate } from 'react-router-dom';

window.FontAwesomeConfig = { searchPseudoElements: true };

const RouteContainer = () => {
    const { url, setUrl } = useContext(UrlContext);
    const { prevUrl, setPrevUrl } = useContext(PrevUrlContext);
    const { urlParams, setUrlParams } = useContext(UrlParamsContext);
    const { prevUrlParams, setPrevUrlParams } = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);
    const navigate = useNavigate();
    const removeQuery = ["category_explorer", "postcode", "service_search", "categories", "demographic"];

    useEffect(() => {
        async function checkQuery() {
            for (const [key, value] of Object.entries(urlParams)) {
                if (key === "select_demographics" && value === "true") {
                    setPage("SelectDemographics");
                } else if (key === "category_explorer" && value !== "") {
                    setPage("CategoryExplorer");
                } else if (key === "support_service" && value !== "") {
                    setPage("ServiceDetail");
                } else if (key === "service_search") {
                    setPage("ListServices");
                } else if (key === "service_search_process" && value === "true") {
                    setPage("ServiceSearchProcess");
                } else if (key === "set_postcode" && value === "true") {
                    setPage("SetPostcode");
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
                    serviceArray.push(key + "=" + value);
                } else {
                    serviceArray.push(key);
                }
            }
        }

        let newServiceUrl = urlArray.filter(val => !serviceArray.includes(val)).join("&");
        if (newServiceUrl !== "") newServiceUrl = "&" + newServiceUrl;
        const updatedUrl = "?support_service=" + e;
        const newServiceObj = { support_service: e.toString() };
        navigate(updatedUrl);

        setUrl(updatedUrl);
        setPage("ServiceDetail");
        setUrlParams(newServiceObj);

        prevUrlArray.push(updatedUrl);
        setPrevUrl(prevUrlArray);

        prevUrlParamsArray.push(newServiceObj);
        setPrevUrlParams(prevUrlParamsArray);
    };

    return (
        isLoading ? (<AppLoading />) :
        (
            (page === "CategoryExplorer") ? <CategoryExplorer onClick={ServiceCardEvent} /> :
            (page === "ServiceDetail") ? <ServiceDetail /> :
            (page === "ServiceSearchProcess") ? <ServiceSearchProcess /> :
            (page === "ListServices") ? <ListServices onClick={ServiceCardEvent} /> :
            (page === "SetPostcode") ? <SetPostcode /> :
            (page === "SelectCategories") ? <SelectCategories /> :
            (page === "SelectDemographics") ? <SelectDemographics /> :
            <Home />
        )
    );
};

export default RouteContainer;