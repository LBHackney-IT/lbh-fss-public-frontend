import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import ListCategories from "../Category/ListCategories";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import Header from "../Header/Header";
import FormInput from "../FormInput/FormInput";
import FormInputSubmit from "../FormInputSubmit/FormInputSubmit";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useQueryParams, NumberParam } from 'use-query-params';
import styled from "styled-components";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';
import MapPlaceholder from "../MapPlaceholder/MapPlaceholder";
import { green, light } from "../../settings";
import breakpoint from 'styled-components-breakpoint';

const HomeHeader = styled.div`
    padding: 17px 15px 2px;
    background: ${green["main"]};
    z-index: 1;
    ${breakpoint('md')`
        position: relative;
    `}
`;

const Home = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode", "service_search", "support_service", "categories", "demographic"];
    const { register, handleSubmit, errors, reset } = useForm();
    const currentSearch = window.location.search;
    const storedPostcode = localStorage.getItem("postcode");
    let prevUrlArray = [""];
    let paramObj = {};
    let prevUrlParamsArray = [{}];

    function createParamObj(currentSearch, paramsArray) {
        const queryParts = currentSearch.substring(1).split(/[&;]/g);
        const arrayLength = queryParts.length;
        for (let i = 0; i < arrayLength; i++) {
            const queryKeyValue = queryParts[i].split("=");
            if (paramsArray.includes(queryKeyValue[0])) {
                paramObj[queryKeyValue[0]] = queryKeyValue[1];
            } 
        }
    }

    const setPreviousUrls = (currentSearch) => {
        if (currentSearch) {
            setUrl(currentSearch);

            // setPrevUrl
            prevUrlArray.push(currentSearch);
            setPrevUrl(prevUrlArray);

            // setPrevUrlParams
            createParamObj(currentSearch, paramsArray);
            prevUrlParamsArray.push(paramObj);
            setPrevUrlParams(prevUrlParamsArray);
            
        }
    }

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    let postcodeQuery = storedPostcode;
    if (!storedPostcode) {
        postcodeQuery = undefined;
    }

    // keyword search
    async function submitForm({ service_search }) {
        if (isLoading) return;

        let searchQuery = service_search;
        if (service_search === "") {
            searchQuery = undefined;
        }

        history.push("?postcode=" + storedPostcode + "&service_search=" + service_search);
        setPreviousUrls(currentSearch);
        setUrlParams({postcode: postcodeQuery, service_search: searchQuery});
    }

    // category explorer
    const selectCategory = e => {
        history.push("?category_explorer=" + e + "&postcode=" + postcodeQuery);
        setUrlParams({category_explorer: e, postcode: postcodeQuery});
        setPreviousUrls(currentSearch);  
    };

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <div className="Home">
                <Header />
                <HomeHeader>
                    <form id="fss--find-service" onSubmit={handleSubmit(submitForm)} data-testid="form">
                        <FormInputSubmit
                            id="fss--service-search"
                            label="Search for a service"
                            placeholder="Enter keyword or organisation"
                            name="service_search"
                            type="text"
                            register={register}
                        />
                    </form>
                </HomeHeader>
                <ListCategories onClick={selectCategory} />
                <MapPlaceholder />
            </div>
            </>
        )
    )
}

export default Home;
