import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';

export const ServiceFilterContainer = styled.div`
    background: #00664F;
    opacity: 0.9;
    width: 100%;
    max-height: 60px;
`;

const FilterButton = styled.button`
    color: #fff;
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
`;

const ServiceFilter = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const pathCategories = "?select_categories=true";
    const pathDemographics = "?select_demographics=true";
    let showCategoriesButton = true;

    const selectCategoriesEvent = e => {
        history.push(pathCategories);
        setUrl(pathCategories);
        setUrlParams({"select_categories": "true"});
    };
    const selectDemographicsEvent = e => {
        history.push(pathDemographics);
        setUrl(pathDemographics);
        setUrlParams({"select_demographics": "true"});
    };

    

    for (const [key, value] of Object.entries(urlParams)) {
        if (key == "category_explorer" && value !== "") {
            showCategoriesButton = false;
        }
    }

    return (
        <ServiceFilterContainer>
            {(showCategoriesButton) ?
                <FilterButton onClick={selectCategoriesEvent}>
                    Categories
                </FilterButton>
            : ""}
            <FilterButton onClick={selectDemographicsEvent}>
                Filters
            </FilterButton>
        </ServiceFilterContainer>
    );
}

export default ServiceFilter;