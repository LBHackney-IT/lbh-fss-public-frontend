import React, {useContext} from "react";
import Back from "../Back/Back";
import PostcodeButton from "../Postcode/PostcodeButton";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import styled from "styled-components";
import { green, light } from "../../settings";

const HeaderContainer = styled.div`
    display: flex;
    background: ${green["main"]};
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid ${green["light"]};
    position: relative;
    z-index: 1;
    h2 {
        color: ${light["white"]};
        font-weight: normal;
        font-size: 24px;
        letter-spacing: -0.0175em;
        margin-bottom: 0;
        margin-left: 15px;
    }
`;

const Header = () => {  
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    let showPostcodeButton = true;
    let isHome = true;
    const paramsArray = ["category_explorer", "postcode", "service_search", "support_service", "categories", "demographic", "set_postcode", "select_categories", "select_demographics", "map_toggle"];

    for (const [key, value] of Object.entries(urlParams)) {
        isHome = false;
        if (key == "set_postcode") {
            showPostcodeButton = false;
        }
    }

    return (
        <HeaderContainer className="no-print">
            {(isHome) ? <h2>Find support services</h2> : <Back />}
            {(showPostcodeButton) ? <PostcodeButton /> : ""}
        </HeaderContainer>
    );
}

export default Header;