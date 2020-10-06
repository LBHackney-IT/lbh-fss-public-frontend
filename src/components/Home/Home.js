import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import ListCategories from "../Category/ListCategories";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
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

const HomeHeader = styled.div`
    padding: 25px 15px 10px;
    background: ${green["main"]};
    h2 {
        color: ${light["white"]};
        font-weight: normal;
        font-size: 36px;
        letter-spacing: -0.0175em;
        margin-bottom: 15px;
    }
`;

const Home = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
    const { register, handleSubmit, errors, reset } = useForm();
    const postcodeRef = useRef();
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

    const storeQuery = (e) => {
        const currentSearch = window.location.search;
        if (currentSearch) {
            setUrl(currentSearch);
            createParamObj(currentSearch, paramsArray);
            
            setUrlParams(paramObj);
        }
        setIsLoading(false);
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

    const handleEvent = e => {
        setQuery({ category_explorer: ~~ e }, 'pushIn');
        storeQuery();
        const currentSearch = window.location.search;
        setPreviousUrls(currentSearch);
        
    };

    async function submitForm({ postcode, service_search }) {
        if (isLoading) return;

        const postcodeValue = document.forms["fss--find-service"]["postcode"].value;
        const searchValue = document.forms["fss--find-service"]["service_search"].value;
        const validPostcode = postcodeValidator(postcode, 'UK');

        if (postcodeValue !== "" && searchValue !== "") {
            if (validPostcode) {
                history.push("?postcode=" + postcode + "&service_search=" + service_search);
                const currentSearch = window.location.search;   
                setPreviousUrls(currentSearch);
                setUrlParams({postcode: postcode, service_search: service_search});
            } else {
                let node = document.createElement("p");
                let textNode = document.createTextNode("Please enter a valid postcode");
                node.appendChild(textNode);
                document.getElementById("postcode-input-container").appendChild(node);
            }
        } else if (postcodeValue !== "") {
            if (validPostcode) {
                localStorage.setItem("postcode", postcode);
                history.push("?postcode=" + postcode + "&service_search");
                const currentSearch = window.location.search;
                setPreviousUrls(currentSearch);
                setUrlParams({postcode: postcode, service_search: undefined});
            } else {
                let node = document.createElement("p");
                let textNode = document.createTextNode("Please enter a valid postcode");
                node.appendChild(textNode);
                document.getElementById("postcode-input-container").appendChild(node);
            }
            
        } else if (searchValue !== "") {
            history.push("?postcode&service_search=" + service_search);
            const currentSearch = window.location.search;
            setPreviousUrls(currentSearch);
            setUrlParams({postcode: undefined, service_search: service_search});
            localStorage.removeItem('postcode');
        }
    }

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <div className="Home">
                <HomeHeader>
                    <h2>Find support services</h2>
                    <form id="fss--find-service" onSubmit={handleSubmit(submitForm)} data-testid="form">
                        <div id="postcode-input-container">
                            <FormInput
                                id="fss--postcode"
                                label="Enter a postcode"
                                placeholder="Set your postcode e.g E8 1DY"
                                name="postcode"
                                inputRef={postcodeRef}
                                register={register}
                                defaultValue={storedPostcode}
                            />
                        </div>
                        <FormInputSubmit
                            id="fss--service-search"
                            label="Search for a service"
                            placeholder="Search..."
                            name="service_search"
                            type="text"
                            register={register}
                        />
                    </form>
                </HomeHeader>
                <ListCategories onClick={handleEvent} />
                <MapPlaceholder />
            </div>
            </>
        )
    )
}

export default Home;
