import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
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

export const SetPostcodeContainer = styled.div`
    padding: 20px 15px;
    span[role=alert] {
        colour: #BE3A34;
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
`;

const SetPostcode = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    // const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
    const { register, handleSubmit, errors, reset } = useForm();
    const storedPostcode = localStorage.getItem("postcode");



    // TODO fix ?service=7 > set_postcode > submit


    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    async function submitForm({ postcode }) {
        if (isLoading) return;
        let updatePrevUrl = [prevUrl];
        const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
        const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];
        
        const validPostcode = postcodeValidator(postcode, 'UK');
        if (validPostcode) {
            localStorage.setItem("postcode", postcode);

            // replace prevUrlParams.postcode value
            const urlArray = prevUrl.substring(1).split(/[&;]/g);
            console.log("urlArray");
            console.log(urlArray);
            console.log("prevUrl");
            console.log(prevUrl);
            for (const [key, value] of Object.entries(prevUrlParams)) {
                if (key == "postcode" && value !== "") {
                    prevUrlParams.postcode = postcode;


                    let paramObj = {};
                    const arrayLength = urlArray.length;
                    for (let i = 0; i < arrayLength; i++) {
                        const queryKeyValue = urlArray[i].split("=");
                        if (queryKeyValue.includes("postcode")) {
                            queryKeyValue[1] = postcode;
                        }
                        paramObj[queryKeyValue[0]] = queryKeyValue[1];
                    }

                    // convert object to query string and remove =undefined from string
                    updatePrevUrl = "?" + new URLSearchParams(paramObj).toString();
                    updatePrevUrl = updatePrevUrl.replaceAll("=undefined", "");
                    updatePrevUrl = [updatePrevUrl];
                }
            }

            history.push(updatePrevUrl);
            setUrl(updatePrevUrl);
            setUrlParams(prevUrlParams);
        }
    }

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <div className="">
                <Header />
                <SetPostcodeContainer>    
                    <h2>Set your postcode</h2>
                    <p>This will list services near you</p>
                    <form onSubmit={handleSubmit(submitForm)} data-testid="form">
                        <FormInput
                            label="Enter a postcode"
                            placeholder="Set your postcode e.g E8 1DY"
                            name="postcode"
                            register={register}
                            defaultValue={storedPostcode}
                            validate={{
                                pattern: (value) => {
                                    return (
                                        postcodeValidator(value, 'UK') ||
                                        "Please enter a valid postcode"
                                    );
                                },
                            }}
                            error={errors.postcode}
                        />
                        <StyledButton type="submit" label="Set postcode" disabled={isLoading} />
                    </form>
                </SetPostcodeContainer>
            </div>
            </>
        )
    )
}

export default SetPostcode;