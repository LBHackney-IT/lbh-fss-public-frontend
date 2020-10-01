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
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';
import { dark, red } from "../../settings";
import {FilterContainer} from "../../util/styled-components/FilterContainer";
import {CheckboxContainer} from "../../util/styled-components/CheckboxContainer";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import ServiceFilter from '../ServiceFilter/ServiceFilter';
import MapPlaceholder from "../MapPlaceholder/MapPlaceholder";

export const SetPostcodeContainer = styled.div`
    padding: 20px 15px;
    h2 {
        font-size: 27px;
        font-weight: normal;
        margin-bottom: 10px;
    }
    p {
        font-size: 19px;
        color: ${dark["grey"]};
    }
    input[name=postcode] {
        border: 2px solid ${dark["offBlack"]};
        box-sizing: border-box;
        border-radius: 3px;
    }
    span[role=alert] {
        color: ${red["error"]};
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
    border-radius: 3px;
    border-bottom: 2px solid ${dark["black"]};
`;

const SelectCategories = () => {
    const [data, setData] = useState([]);
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
    const { register, handleSubmit, errors, reset } = useForm();
    const storedPostcode = localStorage.getItem("postcode");
    const currentSearch = window.location.search;
    let paramObj = {};

    useEffect(() => {
        async function fetchData() {
            const getCategories = await GetTaxonomies.retrieveTaxonomies({});
            setData(getCategories || []);
            setIsLoading(false);
        }
    
        // if directly accessing this page redirect user back to home
        // if (prevUrl.length == 0 && prevUrlParams.length == 0) {
        //     history.push("?");
        //     setUrl("");
        //     setUrlParams({});
        // } else {
            fetchData();
        // }
    
    }, [setData, setIsLoading]);

    // console.log("prevUrl");
    // console.log(prevUrl);
    // console.log("prevUrlParams");
    // console.log(prevUrlParams);
    // prevUrl
    // ["", "?&postcode=bs50ee&service_search"]
    // prevUrlParams
    // (2) [{…}, {…}]
    // 0: {}
    // 1: {postcode: "bs50ee", service_search: undefined}

    async function submitForm() {
        if (isLoading) return;
        // understand previous url params e.g. postcode=bs50ee&service_search // postcode&service+search=food+bank // postcode&service+search=food+bank&categories=1+2
        
        // keep track of prev url
        const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
        const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];

        let categoriesArray = [];
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (let i = 0; i < checkboxes.length; i++) {
            categoriesArray.push(checkboxes[i].value);
        }
        console.log(categoriesArray);

        if (categoriesArray.length === 0) {
            console.log('none selected');
        } else {
            console.log('some selected');
        }

        history.push(url);
        setUrl(url);
        setUrlParams(urlParams["categories"] = categoriesArray);

        // make string separated by +
        // clear all previous categories in urlParams (or prevUrlParams)
        // append new categories filter to urlParams
        // make request (in listservices)
        // push
        
    }
    console.log(urlParams);

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <FilterContainer>
                <Header />
                <ServiceFilter />
                <h2>Select categories</h2>
                <form onSubmit={handleSubmit(submitForm)} data-testid="form">
                    <CheckboxContainer>
                        {data.map((category, index) => {
                            return (
                                <FormCheckbox
                                    key={index}
                                    taxonomyId={category.id}
                                    type="checkbox"
                                    label={category.name}
                                    name={category.name}
                                    register={register}
                                    value={category.id}
                                    // error={errors.agreeToTerms}
                                />
                            );
                        })}
                        <StyledButton type="submit" label="Select categories" disabled={isLoading} />
                    </CheckboxContainer>
                </form>
            </FilterContainer>
            <MapPlaceholder />
            </>
        )
    )
}

export default SelectCategories;