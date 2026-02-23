import React, { useContext } from "react";
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { useNavigate } from "react-router-dom";

const ServiceSearchProcess = () => {
    const navigate = useNavigate();
    const {setUrl} = useContext(UrlContext);
    const {setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams} = useContext(PrevUrlParamsContext);
    const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];
    const searchValue = prevUrlParamsArrayLast["service_search"];
    
    prevUrlParamsArrayLast["service_search"] = searchValue;
    delete prevUrlParamsArrayLast["select_demographics"];
    let push = "?" + new URLSearchParams(prevUrlParamsArrayLast).toString().replace(/%2520/g,"");
    push = push.replaceAll("=undefined", "");
    navigate(push);
    
    setUrl(push);
    setUrlParams(prevUrlParamsArrayLast);
    
    return (
        <AppLoading />
    );
}

export default ServiceSearchProcess;