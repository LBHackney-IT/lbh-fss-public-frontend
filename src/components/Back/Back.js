import React, {useContext, useState, useEffect} from "react";
import styled from "styled-components";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import history from '../../history';

const BackButton = styled.button`
    border: 0;
    padding: 10px 15px;
    background: transparent;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    &::before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        content: "\f007";
        margin-right: 10px;
    }
`;

const Back = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const storedPostcode = localStorage.getItem("postcode");

    const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
    const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];

    const select = e => {
        let push = "/?";
        let params = {};

        // if "service" (ServiceDetail)
            // if prevUrl exists
                // go back to prevUrl (the latest array item which includes ?category_explorer || ?postcode&service_search
            // else
                // if has postcode
                    // postcode={localstorage}&service_search
                // else
                    // default ? Home.js?

        // else if "set_postcode" || "select_categories" || "select_demographics" // DO NOT NEED THESE PAGES IN PREVURL
            // go back to prevUrl (?category_explorer || ?postcode&service_search || ?service) lastArray object
        // else ?category_explorer && ?postcode&service_search will go back to Home.js

        for (const [key, value] of Object.entries(urlParams)) {
            // if service detail page
            if (key == "service" && value !== "") {
                if (prevUrl.length !== 0) {
                    // if category_explorer exists in prevUrlParams
                    const categoryExplorerObj = prevUrlParams.find(categoryExplorerObj => categoryExplorerObj.category_explorer);
                    if (categoryExplorerObj !== undefined) {
                        push = "?" + new URLSearchParams(categoryExplorerObj).toString();
                        params = categoryExplorerObj;
                    }
                    // if postcode exists in prevUrlParams
                    const ListServicesPostcodeObj = prevUrlParams.find(ListServicesPostcodeObj => ListServicesPostcodeObj.postcode);
                    if (ListServicesPostcodeObj !== undefined) {
                        push = "?" + new URLSearchParams(ListServicesPostcodeObj).toString();
                        params = ListServicesPostcodeObj;
                    }
                    // if service_search exists in prevUrlParams
                    const ListServicesSearchObj = prevUrlParams.find(ListServicesSearchObj => ListServicesSearchObj.service_search);
                    if (ListServicesSearchObj !== undefined) {
                        push = "?" + new URLSearchParams(ListServicesSearchObj).toString();
                        params = ListServicesSearchObj;
                    }
                    push = push.replaceAll("=undefined", "");
                } else {
                    if (storedPostcode) {
                        push = "?postcode="+storedPostcode+"&service_search";
                        params = {"postcode": storedPostcode, "search_service": undefined};
                    }
                }
            // else if a middlelayer page i.e. setting postcode, selecting categories or demographics
            } else if ((key == "set_postcode" || key == "select_categories" || key == "select_demographics") && value == "true") {
                push = prevUrlArrayLast;
                params = prevUrlParamsArrayLast;
            }
            // anything else (category explorer / list services) will use default route
        }
        
        history.push(push);
        setUrl(push);
        setUrlParams(params);

    }

    return (
        <BackButton onClick={select}>Back</BackButton>
    );
}

export default Back;