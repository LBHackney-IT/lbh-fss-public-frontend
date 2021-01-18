import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import GetTaxonomies from "../../services/GetTaxonomies/GetTaxonomies";
import Header from "../Header/Header";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import FormInput from "../FormInput/FormInput";
import FormError from "../FormError/FormError";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { applyStyleModifiers } from 'styled-components-modifiers';
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';
import { green, dark, red, light } from "../../settings";
import breakpoint from 'styled-components-breakpoint';
import {FilterContainer} from "../../util/styled-components/FilterContainer";
import {CheckboxContainer} from "../../util/styled-components/CheckboxContainer";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import ServiceSearch from '../ServiceSearch/ServiceSearch';
import ServiceFilter from '../ServiceFilter/ServiceFilter';
import MapPlaceholder from "../MapPlaceholder/MapPlaceholder";
import CategoryCard from "../Category/CategoryCard";
import CategoryExplorer from "../Category/CategoryExplorer";
import { handleSetPrevUrl } from "../../util/functions/handleSetPrevUrl";

export const BUTTON_MODIFIERS = {
    ghost: () => `
        position: absolute;
        top: -50px;
        left: 180px;
        width: auto;
        padding: 8px;
        color: ${green["main"]};
        background: transparent;
        border: 1px solid ${green["ghost"]};
        font-size: 16px;
        &:hover, &:focus {
            color: ${light["white"]};
        }
        @media(min-width:768px) {
            top: -44px;
        }
    `,
}

const StyledButton = styled(Button)`
    width: 100%;
    border-radius: 3px;
    border-bottom: 2px solid ${dark["black"]};
    ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;

export const CategoryCardContainer = styled.div`
  .fss--card {
    box-shadow: none;
    border: 0;
    cursor: auto;
    margin-bottom: 0;
    position: relative;
    z-index: 1;
    .fss--card--container {
      padding: 20px 15px;
      &::after {
          content: none;
      }
    }
    .fss--card--content {
      margin-right: 0;
    }
  }
`;

const SelectDemographics = () => {
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    
    let defaultValues = {
        checkbox: "",
    };

    let selectedObj = {};
    if (urlParams !== undefined) {
        for (const [key, value] of Object.entries(urlParams)) {
            if (key == "demographic" && value !== "") {
                if (Array.isArray(value) && value.length >= 1) {
                    selectedObj = value.reduce((a,b)=> (a[b]=true,a),{});
                }
                // used if coming from url with demographic set
                if (typeof value === 'string' && value.indexOf("+") > -1) {
                    value = value.split("+");
                    selectedObj = value.reduce((a,b)=> (a[b]=true,a),{});
                }
                if (typeof value === 'string' && value.indexOf("+") === -1) {
                    selectedObj[value] = true;
                }
            }
        }
    }
    defaultValues = selectedObj;

    let categoryExplorerObj, listServicesSearchObj, listServicesPostcodeObj = null;
    if (urlParams !== 0) {
        categoryExplorerObj = [urlParams].find(categoryExplorerObj => categoryExplorerObj.category_explorer);
        listServicesSearchObj = [urlParams].find(listServicesSearchObj => listServicesSearchObj.service_search);
        listServicesPostcodeObj = [urlParams].find(listServicesPostcodeObj => listServicesPostcodeObj.postcode);
    }

    let isFromCategoryExplorer = false;
    if (categoryExplorerObj) {
        isFromCategoryExplorer = true;
    }

    const { register, handleSubmit } = useForm({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        async function fetchData() {
            const getDemographics = await GetTaxonomies.retrieveTaxonomies({vocabulary: "demographic"});
            setData(getDemographics || []);

            let categoryId = "";
            if (Object.entries(urlParams)[0] && Object.entries(urlParams)[0][0] == "category_explorer" && Object.entries(urlParams)[0][1] !== "") {
                categoryId = parseInt(Object.entries(urlParams)[0][1]);
            }
            // call getTaxonomy with categoryId param passed to return the category name and description
            const getCategories = await GetTaxonomies.getTaxonomy(categoryId);
            setCategoryData(getCategories || []);

            setIsLoading(false);
        }
    
        // if directly accessing this page
        // without category_explorer / service_search / postcode passed
        // redirect user back to home
        if (prevUrl.length === 0 && prevUrlParams.length === 0) {
            if (!(categoryExplorerObj || listServicesSearchObj || listServicesPostcodeObj)) {
                history.push("?");
                setUrl("");
                setUrlParams({});
            }
        }
        fetchData();

        const setPrevUrlVals = handleSetPrevUrl({
            prevUrl, prevUrlParams
        });
        if (setPrevUrlVals) {
            setPrevUrl(setPrevUrlVals.prevUrlArray);
            setPrevUrlParams(setPrevUrlVals.prevUrlParamsArray);
        }
    
    }, [setData, setCategoryData, setIsLoading]);

    async function submitForm() {
        if (isLoading) return;

        delete urlParams["demographic"];

        let demographicsArray = [];
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (let i = 0; i < checkboxes.length; i++) {
            demographicsArray.push(checkboxes[i].value);
        }

        if (demographicsArray.length !== 0) {
            urlParams["demographic"] = demographicsArray;
        }
        
        delete urlParams["select_demographics"];
        let push = "?" + new URLSearchParams(urlParams).toString().replace(/%2C/g,"+").replace(/%2B/g,"+");
        push = push.replaceAll("=undefined", "");
        history.push(push);
        setUrl(push);
        setUrlParams(urlParams);
        setPrevUrl([push]);
        setPrevUrlParams([urlParams]);
    }

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <FilterContainer>
                <Header />
                {
                ( !isFromCategoryExplorer )
                    ?
                <ServiceSearch />
                    :
                <CategoryCardContainer>
                    <CategoryCard
                      key={categoryData.id}
                      category={categoryData}
                    />
                </CategoryCardContainer>
                }
                <ServiceFilter />
                <h2>Select filters</h2>
                <form onSubmit={handleSubmit(submitForm)} data-testid="form">
                    <StyledButton modifiers="ghost" type="submit" label="Apply" disabled={isLoading} />
                    <CheckboxContainer>
                        {data.map((demographic, index) => {
                            const demographicIdString = demographic.id.toString();
                            return (
                                <FormCheckbox
                                    key={index}
                                    taxonomyId={demographic.id}
                                    type="checkbox"
                                    label={demographic.name}
                                    name={demographicIdString}
                                    register={register}
                                    value={demographic.id}
                                />
                            );
                        })}
                        <StyledButton type="submit" label="Apply filters" disabled={isLoading} />
                    </CheckboxContainer>
                </form>
            </FilterContainer>
            <MapPlaceholder />
            </>
        )
    )
}

export default SelectDemographics;