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

const Back = ({onClick}) => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);

    console.log("prevUrl back.js");
    console.log(prevUrl); // array
    // on ?zello_world=2&postcode=GL14%201RE&service_search
    // ["", "?zello_world"]
    const arrayLast = prevUrl[prevUrl.length - 1];
    console.log(arrayLast);

    const select = e => {
        // console.log('back');
        // console.log(urlParams);
        let push = "/?";
        let params = {};

        // console.log("history");
        // console.log("push");
        // console.log(push);
        // console.log("url");
        // console.log(url); // string of current url
        // console.log("prevUrl back.js onclick");
        // console.log(prevUrl); // array
        const currentSearch = window.location.search;

        // if service
            // if prevUrl exists
                // go back to prevUrl
            // else
                // if has postcode
                    // postcode={localstorage}&service_search
                // else
                    // default ? Home.js?

        // anything else will go back to Home.js

        for (const [key, value] of Object.entries(urlParams)) {
            if (key == "service" && value !== "") {
                // need to check if postcode is set else go back to Home
                // console.log("prevUrl");
                // console.log(prevUrl);
                if (prevUrl.length !== 0) {
                    push = prevUrl[0];
                    params = prevUrlParams; // ["postcode=GL543ND", "service_search", "categories=1+2", "demographic=3"]
                    // console.log('test1');
                } else {
                    const storedPostcode = localStorage.getItem("postcode");
                    // console.log('test2');
                    if (storedPostcode) {
                        push = "?postcode="+storedPostcode+"&service_search";
                        params = {"postcode": storedPostcode, "search_service": undefined};
                        // console.log('test3');
                    }
                }
            }
        }
        // console.log("push");
        // console.log(push);
        // console.log("params");
        // console.log(params);
        
        history.push(push);
        setUrl(push);
        // setPrevUrl(prevUrl); // ["", "?postcode&service=7&service_search=1"]
        setUrlParams(params);
        // setPrevUrl(prevUrl.push(url));
        // history.push(push);
        // setUrlParams(params);

    }

    return (
        <BackButton onClick={select}>Back</BackButton>
    );
}

export default Back;