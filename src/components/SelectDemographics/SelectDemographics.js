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
import { dark, red, light } from "../../settings";
import {FilterContainer} from "../../util/styled-components/FilterContainer";
import {CheckboxContainer} from "../../util/styled-components/CheckboxContainer";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import ServiceFilter from '../ServiceFilter/ServiceFilter';
import MapPlaceholder from "../MapPlaceholder/MapPlaceholder";

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
    const paramsArray = ["category_explorer", "postcode" , "service_search", "support_service"];
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

    const { register, handleSubmit } = useForm({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        async function fetchData() {
            const getDemographics = await GetTaxonomies.retrieveTaxonomies({vocabulary: "demographic"});
            setData(getDemographics || []);
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
        if (isLoading) return;

        let demographicsArray = [];
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (let i = 0; i < checkboxes.length; i++) {
            demographicsArray.push(checkboxes[i].value);
        }

        if (demographicsArray.length === 0) {
            delete prevUrlParamsArrayLast["demographic"];
            let push = "?" + new URLSearchParams(prevUrlParamsArrayLast).toString().replace(/%2C/g,"+").replace(/%2B/g,"+");
            push = push.replaceAll("=undefined", "");
            history.push(push);
            setUrl(push);
            setUrlParams(prevUrlParamsArrayLast);
        } else {
            prevUrlParamsArrayLast["demographic"] = demographicsArray;
            let push = "?" + new URLSearchParams(prevUrlParamsArrayLast).toString().replace(/%2C/g,"+").replace(/%2B/g,"+");
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
                        <StyledButton type="submit" label="Select filters" disabled={isLoading} />
                    </CheckboxContainer>
                </form>
            </FilterContainer>
            <MapPlaceholder />
            </>
        )
    )
}

export default SelectDemographics;