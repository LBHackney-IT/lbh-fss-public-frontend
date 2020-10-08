import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import { useForm } from "react-hook-form";
import FormInputSubmit from "../FormInputSubmit/FormInputSubmit";
import { green, yellow, light } from "../../settings";

export const ServiceSearchContainer = styled.div`
    background: ${green["main"]};;
    width: 100%;
    display: flex;
    align-items: center;
    opacity: 1;
    padding: 17px 15px;
    position: relative;
    z-index: 1;
    form {
        width: 100%;
        input {
            margin-bottom: 0;
        }
    }
`;

const ServiceSearch = ({onClick}) => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const { register, handleSubmit, errors, reset } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
    const storedPostcode = localStorage.getItem("postcode");
    const [searchTerm, setSearchTerm] = useState("");
    const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
    const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];

    useEffect(() => {
        for (const [key, value] of Object.entries(urlParams)) {
            if (key == "service_search" && value !== undefined) {
                setSearchTerm(value);
            }
        }
        setIsLoading(false);
    });

    async function submitForm() {
        if (isLoading) return;

        let searchValue = document.forms["fss--find-service"]["service_search"].value;

        let prevUrlParamsArray = prevUrlParams;
        prevUrlParamsArrayLast["service_search"] = searchValue;
        prevUrlParamsArray.push(prevUrlParamsArrayLast);
        setPrevUrlParams(prevUrlParamsArray);

        setUrlParams({"service_search_process": "true"});

    }

    return (
        <ServiceSearchContainer>
            <form id="fss--find-service" onSubmit={handleSubmit(submitForm)} data-testid="form">
                <FormInputSubmit
                    id="fss--service-search"
                    label="Search for a service"
                    placeholder="Search..."
                    name="service_search"
                    type="text"
                    register={register}
                    defaultValue={searchTerm}
                />
            </form>
        </ServiceSearchContainer>
    );
}

export default ServiceSearch;