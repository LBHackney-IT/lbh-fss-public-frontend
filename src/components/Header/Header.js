import React, {useContext} from "react";
import Back from "../Back/Back";
import PostcodeButton from "../Postcode/PostcodeButton";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import styled from "styled-components";
import { green } from "../../settings";

const HeaderContainer = styled.div`
    display: flex;
    background: ${green["main"]};
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid ${green["light"]};
`;

const Header = () => {  
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    let showPostcodeButton = true;

    for (const [key, value] of Object.entries(urlParams)) {
        if ((key == "set_postcode" || key == "select_categories" || key == "select_demographics") && value == "true") {
            showPostcodeButton = false;
        }
    }

    return (
        <HeaderContainer>
            <Back />
            {(showPostcodeButton) ? <PostcodeButton /> : ""}
        </HeaderContainer>
    );
}

export default Header;