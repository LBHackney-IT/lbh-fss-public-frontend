import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';
import { green, light } from "../../settings";

const PostcodeButtonContainer = styled.button`
    background: ${green["dark"]};
    color: ${light["white"]};
    border: 0;
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 130px;
    text-align: left;
    &.postcode-set {
        background: ${green["dark"]};
        padding: 20px 15px;
        text-transform: uppercase;
    }
    &::before {
        display: none;
        font-family: "Font Awesome 5 Duotone";
        font-weight: 900;
        content: "\f3c5";
        margin-right: 10px;
    }
    svg {
        margin-right: 10px;
        font-size: 24px;
        path.fa-secondary {
            color: #A4D65E;
            opacity: 1;
        }
        path.fa-primary {
            color: #fff;
        }
    }

`;

const PostcodeButton = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    let postcode = "Set your postcode";
    const path = "?set_postcode=true";
    let buttonModifier = "";

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
    if (storedPostcode) {
        postcode = storedPostcode;
        buttonModifier = 'postcode-set';
    }

    return (
        <PostcodeButtonContainer className={buttonModifier} onClick={handleEvent}>
            {postcode}
        </PostcodeButtonContainer>
    );
}

export default PostcodeButton;