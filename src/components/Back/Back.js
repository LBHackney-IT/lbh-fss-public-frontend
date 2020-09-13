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

    const arrayLast = prevUrl[prevUrl.length - 1];
    // TODO when navigating to ?service - array.push for multi level prevUrl array

    const select = e => {
        // console.log('back');
        let push = "/?";
        let params = {};

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
            if ((key == "service" || key == "set_postcode") && value !== "") {
                if (prevUrl.length !== 0) {
                    push = prevUrl[0];
                    params = prevUrlParams;
                } else {
                    const storedPostcode = localStorage.getItem("postcode");
                    if (storedPostcode) {
                        push = "?postcode="+storedPostcode+"&service_search";
                        params = {"postcode": storedPostcode, "search_service": undefined};
                    }
                }
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