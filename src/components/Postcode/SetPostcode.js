import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useQueryParams, NumberParam } from 'use-query-params';
import styled from "styled-components";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';

export const SetPostcodeContainer = styled.div`

`;

const SetPostcode = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    // const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
    const { register, handleSubmit, errors, reset } = useForm();
    const postcodeRef = useRef();

    async function submitForm({ postcode, service_search }) {
        if (isLoading) return;

        const validPostcode = postcodeValidator(postcode, 'UK');
        if (validPostcode) {
            localStorage.setItem("postcode", postcode);
            if (url) {
                history.push(url + "&postcode=" + postcode + "&service_search");
            } else {
                history.push("?postcode=" + postcode + "&service_search");
            }

            setUrlParams({postcode: postcode, service_search: undefined});
        // TODO add keyword search
        } else {
            postcodeRef.current.focus();
        }
    
    }

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <SetPostcodeContainer>
                <h2>Set your postcode</h2>
                <p>This will list services near you</p>
                <form onSubmit={handleSubmit(submitForm)} data-testid="form">
                    <FormInput
                        label="Enter a postcode"
                        placeholder="Set your postcode e.g E8 1DY"
                        name="postcode"
                        inputRef={postcodeRef}
                        register={register}
                        validate={{
                            pattern: (value) => {
                                return (
                                    postcodeValidator(value, 'UK') ||
                                    "Enter a valid UK postcode"
                                );
                            },
                        }}
                        error={errors.postcode}
                    />
                    <StyledButton type="submit" label="Set postcode" disabled={isLoading} />
                </form>
            </SetPostcodeContainer>
            </>
        );
    );
}

export default SetPostcode;