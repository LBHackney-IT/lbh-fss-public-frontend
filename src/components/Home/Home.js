import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import ListCategories from "../Category/ListCategories";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import FormInput from "../FormInput/FormInput";
import FormInputSubmit from "../FormInputSubmit/FormInputSubmit";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useQueryParams, NumberParam } from 'use-query-params';
import styled from "styled-components";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';

const HomeHeader = styled.div`
    padding: 25px 15px 10px;
    background: #00664F;
    h2 {
        color: #fff;
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
    const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
    const { register, handleSubmit, errors, reset } = useForm();
    const postcodeRef = useRef();

    const storeQuery = (e) => {
        let paramObj = {};
        const currentSearch = window.location.search;
        if (currentSearch) {
          setUrl(currentSearch);
  
          const queryParts = currentSearch.substring(1).split(/[&;]/g);
          const arrayLength = queryParts.length;
          for (let i = 0; i < arrayLength; i++) {
            const queryKeyValue = queryParts[i].split("=");
            if (paramsArray.includes(queryKeyValue[0])) {
              if (queryKeyValue[1]) {
                paramObj[queryKeyValue[0]] = queryKeyValue[1];
              }
            } 
          }
          setUrlParams(paramObj);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const handleEvent = e => {
        setQuery({ category_explorer: ~~ e }, 'pushIn')
        storeQuery();
        const currentSearch = window.location.search;
        if (currentSearch) {
            setUrl(currentSearch); // ?postcode&service=7&service_search=1
            let arr = [url];
            console.log("home.js handleevent url");
            console.log(url);
            console.log("home.js handleevent arr");
            console.log(arr);
            console.log("home.js handleevent currentSearch");
            console.log(currentSearch);
            arr.push(currentSearch);
            setPrevUrl(arr);
        }
    };

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

    // console.log('Home');
    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <div className="Home">
                <HomeHeader>
                    <h2>Find support services</h2>
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
                        <FormInputSubmit
                            label="Search for a service"
                            placeholder="Search..."
                            name="service_search"
                            type="text"
                            register={register}
                        />
                    </form>
                </HomeHeader>
                <ListCategories onClick={handleEvent} />
            </div>
            </>
        )
    )
}

export default Home;
