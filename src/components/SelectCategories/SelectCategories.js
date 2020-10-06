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
            if (key == "categories" && value !== "") {
                if (Array.isArray(value) && value.length >= 1) {
                    selectedObj = value.reduce((a,b)=> (a[b]=true,a),{});
                }
                // used if coming from url with categories set
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
            const getCategories = await GetTaxonomies.retrieveTaxonomies({vocabulary: "category"});
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
        if (isLoading) return;

        let categoriesArray = [];
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (let i = 0; i < checkboxes.length; i++) {
            categoriesArray.push(checkboxes[i].value);
        }

        if (categoriesArray.length === 0) {
            delete prevUrlParamsArrayLast["categories"];
            let push = "?" + new URLSearchParams(prevUrlParamsArrayLast).toString().replace(/%2C/g,"+").replace(/%2B/g,"+");
            push = push.replaceAll("=undefined", "");
            history.push(push);
            setUrl(push);
            setUrlParams(prevUrlParamsArrayLast);
        } else {
            prevUrlParamsArrayLast["categories"] = categoriesArray;
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
                <h2>Select categories</h2>
                <form onSubmit={handleSubmit(submitForm)} data-testid="form">
                    <CheckboxContainer>
                        {data.map((category, index) => {
                            const categoryIdString = category.id.toString();
                            return (
                                <FormCheckbox
                                    key={index}
                                    taxonomyId={category.id}
                                    type="checkbox"
                                    label={category.name}
                                    name={categoryIdString}
                                    register={register}
                                    value={category.id}
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