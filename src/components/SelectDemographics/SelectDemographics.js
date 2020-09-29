import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import GetCategories from "../../services/GetCategories/GetCategories";
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

const SelectDemographics = () => {
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
          const getCategories = await GetCategories.retrieveCategories({});
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

    async function submitForm({ postcode }) {
        if (isLoading) return;
        // understand previous url params e.g. postcode=bs50ee&service_search // postcode&service+search=food+bank // postcode&service+search=food+bank&categories=1+2
        console.log("url");
        console.log(url);
        console.log("urlParams");
        console.log(urlParams);
        console.log("prevUrl");
        console.log(prevUrl);
        console.log("prevUrlParams");
        console.log(prevUrlParams);
        // get all selected data-taxonomy-id values
        // make string separated by +
        // clear all previous categories in urlParams (or prevUrlParams)
        // append new categories filter to urlParams
        // make request
        // push
        const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
        const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];
    }

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <FilterContainer>
                <Header />
                <ServiceFilter />
                <h2>Select demographics</h2>
                <form onSubmit={handleSubmit(submitForm)} data-testid="form">
                    <CheckboxContainer>
                        {data.map((demographic, index) => {
                            const demographicName = demographic.name.replaceAll(" ", "-").toLowerCase();
                            return (
                                <FormCheckbox
                                    key={index}
                                    taxonomyId={demographic.id}
                                    type="checkbox"
                                    label={demographic.name}
                                    name={demographicName}
                                    register={register}
                                    required
                                    error={errors.agreeToTerms}
                                />
                            );
                        })}
                        <StyledButton type="submit" label="Select demographics" disabled={isLoading} />
                    </CheckboxContainer>
                </form>
            </FilterContainer>
            <MapPlaceholder />
            </>
        )
    )
}

export default SelectDemographics;