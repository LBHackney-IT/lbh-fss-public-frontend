import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import { applyStyleModifiers } from 'styled-components-modifiers';
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';
import { green, yellow, light } from "../../settings";
import { lighten } from 'polished';

export const BAR_MODIFIERS = {
    grey: () => `
        background: ${lighten(0.01, light["greyBorder"])};
        button {
            color: ${green["main"]}
        }
    `,
}

export const ServiceFilterContainer = styled.div`
    background: ${lighten(0.03, green["main"])};
    width: 100%;
    max-height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    ${applyStyleModifiers(BAR_MODIFIERS)};
`;

export const BUTTON_MODIFIERS = {
    active: () => `
        color: ${yellow["selected"]};
    `,
    filter: () => `
        &::before {
            content: "\f0b0";
        }
    `
}

const FilterButton = styled.button`
    color: ${light["white"]};
    font-size: 16px;
    border: 0;
    padding: 20px 15px;
    cursor: pointer;
    background: transparent;
    &::before {
        display: none;
        font-family: "Font Awesome 5 Pro";
        font-weight: 900;
        content: "\f0b0";
    }
    svg {
        margin-right: 10px;
    }
    ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;


const ClearButton = styled.button`
    color: #fff;
    font-size: 16px;
    border: 0;
    padding: 20px 15px;
    cursor: pointer;
    background: transparent;
    margin-left: auto;
`;

const ServiceFilter = ({onClick}) => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
    const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];
    let push = "?" + new URLSearchParams(prevUrlParamsArrayLast).toString().replace(/%2C/g,"+");
    let params = prevUrlParamsArrayLast;
    const pathCategories = "&select_categories=true";
    const pathDemographics = "&select_demographics=true";
    let showCategoriesButton = true;
    let showDemographicsButton = true;
    let showClearAllButton = false;
    let style = "";
    let grey = "";

    const selectCategoriesEvent = e => {
        const selectCategoriesObj = [urlParams].find(selectCategoriesObj => selectCategoriesObj.select_categories);
        if (!selectCategoriesObj) {
            let push = "?" + new URLSearchParams(urlParams).toString().replace(/%2C/g,"+").replace(/%2B/g,"+") + pathCategories;
            push = push.replaceAll("=undefined", "");
            history.push(push);
            setUrl(push);
            urlParams["select_categories"] = "true";
            setUrlParams(urlParams);
        }
    };
    const selectDemographicsEvent = e => {
        const selectDemographicsObj = [urlParams].find(selectDemographicsObj => selectDemographicsObj.select_demographics);
        if (!selectDemographicsObj) {
            let push = "?" + new URLSearchParams(urlParams).toString().replace(/%2C/g,"+").replace(/%2B/g,"+") + pathDemographics;
            push = push.replaceAll("=undefined", "");
            history.push(push);
            setUrl(push);
            urlParams["select_demographics"] = "true";
            setUrlParams(urlParams);
        }
    };
    const clearTaxonomiesEvent = e => {
        let checks = document.querySelectorAll('input[type="checkbox"]');
        for (let i = 0; i < checks.length; i++) {
            let check = checks[i];
            if (!check.disabled) {
                check.checked = false;
            }
        }
    };

    for (const [key, value] of Object.entries(urlParams)) {
        if (key == "category_explorer" && value !== "") {
            showCategoriesButton = false;
            grey = "grey";
        }
        if (key == "select_categories" && value === "true") {
            showDemographicsButton = false;
            showClearAllButton = true;
            style = "active";
        }
        if (key == "select_demographics" && value === "true") {
            showCategoriesButton = false;
            showClearAllButton = true;
            style = "active";
        }
    }

    return (
        <ServiceFilterContainer modifiers={grey}>
            {/* {(showCategoriesButton) ?
                <FilterButton modifiers={style} onClick={selectCategoriesEvent}>
                    Categories
                </FilterButton> : ""} */}
            {(showDemographicsButton) ?
                <FilterButton modifiers={style} onClick={selectDemographicsEvent}>
                    Filters
                </FilterButton> : ""}
            {(showClearAllButton) ?
                <ClearButton onClick={clearTaxonomiesEvent}>
                    Clear all
                </ClearButton> : ""}
        </ServiceFilterContainer>
    );
}

export default ServiceFilter;