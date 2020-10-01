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

const SelectDemographics = () => {
    const [data, setData] = useState([]);
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
    const storedPostcode = localStorage.getItem("postcode");
    const currentSearch = window.location.search;    
    const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
    const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];
    
    let defaultValues = {
        checkbox: "",
    };

    let selectedObj = {};
    if (prevUrlParamsArrayLast !== undefined) {
        for (const [key, value] of Object.entries(prevUrlParamsArrayLast)) {
            if (key == "demographic" && value !== "") {
                
                // used if coming from url with demographic set
                // string 1+2
                if (value.indexOf("+") > -1) {
                    value = value.split("+");
                    selectedObj = value.reduce((a,b)=> (a[b]=true,a),{});
                }
                console.log(value);
                // array of ["1", "2"]
                // array of ["1"]
                // string of 1
                if (value.length >= 1) {
                    selectedObj = value.reduce((a,b)=> (a[b]=true,a),{});
                }
            }
        }
    }
    defaultValues = selectedObj;

    const { register, handleSubmit } = useForm({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        async function fetchData() {
            const getCategories = await GetTaxonomies.retrieveTaxonomies({vocabulary: "demographic"});
            setData(getCategories || []);
            setIsLoading(false);
        }
    
        // if directly accessing this page redirect user back to home
        if (prevUrl.length == 0 && prevUrlParams.length == 0) {
            history.push("?");
            setUrl("");
            setUrlParams({});
        } else {
            fetchData();
        }
    
    }, [setData, setIsLoading]);

    async function submitForm() {
        console.log('submit');
        if (isLoading) return;

        let demographicsArray = [];
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (let i = 0; i < checkboxes.length; i++) {
            demographicsArray.push(checkboxes[i].value);
        }

        if (demographicsArray.length === 0) {
            delete prevUrlParamsArrayLast["demographic"];
        } else {
            prevUrlParamsArrayLast["demographic"] = demographicsArray;
            let push = "?" + new URLSearchParams(prevUrlParamsArrayLast).toString().replace(/%2C/g,"+");
            push = push.replaceAll("=undefined", "");
            history.push(push);
            setUrl(push);
            setUrlParams(prevUrlParamsArrayLast);
        }
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