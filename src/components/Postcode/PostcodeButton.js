import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';

const PostcodeButtonContainer = styled.button`
    background: #005E48;
    color: #fff;
    border: 0;
    padding: 10px 15px;
    cursor: pointer;
    text-transform: uppercase;
    &::before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        content: "\f007";
        margin-right: 10px;
    }
`;

const PostcodeButton = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    let postcode = "Set your postcode";
    const path = "?set_postcode=true";

    const handleEvent = e => {
        history.push(path);
        setUrl(path);
        setUrlParams({"set_postcode": "true"});
    };

    // check if url has valid postcode
    for (const [key, value] of Object.entries(urlParams)) {
        if (key == "postcode" && value !== undefined) {
            const postcode = value.replace("%20", " ");
            const validPostcode = postcodeValidator(postcode, 'UK');
            if (validPostcode) {
                localStorage.setItem("postcode", postcode);
            }
        }
    }

    const storedPostcode = localStorage.getItem("postcode");
    if (storedPostcode) postcode = storedPostcode;

    return (
        <PostcodeButtonContainer onClick={handleEvent}>
            {postcode}
        </PostcodeButtonContainer>
    );
}

export default PostcodeButton;