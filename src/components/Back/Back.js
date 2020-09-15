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
    const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
    const currentSearch = window.location.search;
    let paramObj = {};

    function createParamObj(currentSearch, paramsArray) {
        const queryParts = currentSearch.substring(1).split(/[&;]/g);
        const arrayLength = queryParts.length;
        for (let i = 0; i < arrayLength; i++) {
            const queryKeyValue = queryParts[i].split("=");
            if (paramsArray.includes(queryKeyValue[0])) {
                paramObj[queryKeyValue[0]] = queryKeyValue[1];
            } 
        }
    }
    
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

        if (prevUrl.length !== 0 && prevUrlParams !== 0) {
            for (const [key, value] of Object.entries(urlParams)) {
                // if service detail page
                if (key == "service" && value !== "") {
                    if (prevUrl.length !== 0) {
                        let prevUrlArray = prevUrl;
                        let prevUrlParamsArray = prevUrlParams;

                        const categoryExplorerObj = prevUrlParams.find(categoryExplorerObj => categoryExplorerObj.category_explorer);
                        const listServicesSearchObj = prevUrlParams.find(listServicesSearchObj => listServicesSearchObj.service_search);
                        const listServicesPostcodeObj = prevUrlParams.find(listServicesPostcodeObj => listServicesPostcodeObj.postcode);
                        if (categoryExplorerObj !== undefined) {
                            // if category_explorer exists in prevUrlParams
                            push = "?" + new URLSearchParams(categoryExplorerObj).toString();
                            params = categoryExplorerObj;
                        } else if (listServicesSearchObj !== undefined) {
                            // if service_search exists in prevUrlParams
                            push = "?" + new URLSearchParams(listServicesSearchObj).toString();
                            params = listServicesSearchObj;
                        } else if (listServicesPostcodeObj !== undefined) {
                            // if postcode exists in prevUrlParams
                            push = "?" + new URLSearchParams(listServicesPostcodeObj).toString();
                            params = listServicesPostcodeObj;
                        } else {
                            // if direct on service page and postcode is stored > back will direct the user to the list services page
                            if (storedPostcode) {
                                push = "?postcode="+storedPostcode+"&service_search";
                                params = {"postcode": storedPostcode, "search_service": undefined};
                                prevUrl.splice(1, 0, push);
                                prevUrlParams.splice(1, 0, params);
                            }
                        }
                        push = push.replaceAll("=undefined", "");

                        // if going back from service page, push new category explorer or list services page to arrays - middle layer page will route back to last array item
                        prevUrlArray.push(push);
                        setPrevUrl(prevUrlArray);
                        prevUrlParamsArray.push(params);
                        setPrevUrlParams(prevUrlParamsArray);
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