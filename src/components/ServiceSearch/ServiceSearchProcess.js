import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import history from '../../history';

const ServiceSearchProcess = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];
    const searchValue = prevUrlParamsArrayLast["service_search"];
    
    prevUrlParamsArrayLast["service_search"] = searchValue;
    let push = "?" + new URLSearchParams(prevUrlParamsArrayLast).toString().replace(/%2520/g,"");
    push = push.replaceAll("=undefined", "");
    history.push(push);
    setUrl(push);
    setUrlParams(prevUrlParamsArrayLast);
    
    return (
        <AppLoading />
    );
}

export default ServiceSearchProcess;