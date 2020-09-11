import React, {useContext, useState, useEffect} from "react";
import styled from "styled-components";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
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

    const select = e => {
        console.log('back');
        console.log(urlParams);
        let push = '/?';
        let params = {};

        console.log("history");
        console.log("push");
        console.log(push);
        console.log("url");
        console.log(url); // string of current url
        console.log("prevUrl back.js");
        console.log(prevUrl); // array
        const currentSearch = window.location.search;
        // prevUrl.push("samwong");
        // console.log("prevUrl pushed");
        // console.log(prevUrl);

        if (prevUrl[0] == "") { // if there is no previous route then set default
            for (const [key, value] of Object.entries(urlParams)) {
                if (key == "service" && value !== "") {
                    // need to check if postcode is set else go back to Home
                    push = "?postcode=1&service_search"; //placeholder
                } else {
                    // category_explorer & service listing will use default
                }
            }
            history.push(push);
            setUrlParams(params);
        } else {
            // history.push back an array item
            history.push(prevUrl[0]);
            // setUrlParams to relevant page going back to
        }
        
        // prevUrl.push(currentSearch);
        
        setPrevUrl(prevUrl); // ["", "?postcode&service=7&service_search=1"]
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