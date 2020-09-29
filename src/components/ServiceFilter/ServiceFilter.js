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

export const ServiceFilterContainer = styled.div`
    background: ${green["main"]};
    opacity: 0.9;
    width: 100%;
    max-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const BUTTON_MODIFIERS = {
    active: () => `
        color: ${yellow["selected"]};
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
        content: "\f03a";
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
`;

const ServiceFilter = ({onClick}) => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const pathCategories = "?select_categories=true";
    const pathDemographics = "?select_demographics=true";
    let showCategoriesButton = true;
    let showDemographicsButton = true;
    let showClearAllButton = false;
    let style = "";

    const selectCategoriesEvent = e => {
        for (const [key, value] of Object.entries(urlParams)) {
            if (key !== "select_categories" && value !== "true") {
                history.push(pathCategories);
                setUrl(pathCategories);
                setUrlParams({"select_categories": "true"});
            }
        }
    };
    const selectDemographicsEvent = e => {
        for (const [key, value] of Object.entries(urlParams)) {
            if (key !== "select_demographics" && value !== "true") {
                history.push(pathDemographics);
                setUrl(pathDemographics);
                setUrlParams({"select_demographics": "true"});
            }
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
        (showCategoriesButton) ?
            <ServiceFilterContainer>
                <FilterButton modifiers={style} onClick={selectCategoriesEvent}>
                    Categories
                </FilterButton>
                {(showClearAllButton) ?
                <ClearButton onClick={clearTaxonomiesEvent}>
                    Clear all
                </ClearButton> : ""}
            </ServiceFilterContainer>
        : ""
        (showDemographicsButton) ?
            <ServiceFilterContainer>
                <FilterButton modifiers={style} onClick={selectDemographicsEvent}>
                    Filters
                </FilterButton>
                {(showClearAllButton) ?
                <ClearButton onClick={clearTaxonomiesEvent}>
                    Clear all
                </ClearButton> : ""}
            </ServiceFilterContainer>
        : ""
    );
}

export default ServiceFilter;