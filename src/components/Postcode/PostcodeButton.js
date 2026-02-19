import React, {useContext} from "react";
import styled from "styled-components";
import UrlContext from "../../context/UrlContext/UrlContext";
// import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
// import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { postcodeValidator } from 'postcode-validator';
import { useNavigate } from 'react-router-dom';
import { green, light } from "../../settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostcodeButtonContainer = styled.button`
    display: flex;
    align-items: center;
    width: 112px;
    height: 100%;
    background: ${green["dark"]};
    color: ${light["white"]};
    border: 0;
    padding: 10px 13px;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
    &.postcode-set {
        background: ${green["dark"]};
        padding: 20px 15px;
        text-transform: uppercase;
    }
    svg {
        margin-right: 10px;
        font-size: 24px;
        --fa-primary-color: #fff;
        --fa-secondary-color: #A4D65E;
        --fa-secondary-opacity: 1;
    }
`;

const PostcodeButton = () => {
    const {setUrl} = useContext(UrlContext);
    // const {url, setUrl} = useContext(UrlContext);
    // const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    // const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);    
    const navigate = useNavigate();    
    let postcode = "Set your postcode";
    const path = "?set_postcode=true";
    let buttonModifier = "";

    const handleEvent = () => {
        navigate(path);        
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
            <FontAwesomeIcon icon={["fad", "map-marker-alt"]} />
            {postcode}
        </PostcodeButtonContainer>
    );
}

export default PostcodeButton;