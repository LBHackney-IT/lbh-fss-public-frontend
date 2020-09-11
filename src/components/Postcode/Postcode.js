import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';

const PostcodeButton = styled.button`
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


const Postcode = () => {
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    let postcode = "Set your postcode";
    
    // check if url has valid postcode
    for (const [key, value] of Object.entries(urlParams)) {
        if (key == "postcode" && value !== "") {
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
        <PostcodeButton>{postcode}</PostcodeButton>
    );
}

export default Postcode;