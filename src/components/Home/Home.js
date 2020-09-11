import React, { useEffect, useState, useContext } from "react";
import AppLoading from "../../AppLoading";
import ListCategories from "../Category/ListCategories";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import FormInput from "../FormInput/FormInput";
import FormInputSubmit from "../FormInputSubmit/FormInputSubmit";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useQueryParams, NumberParam } from 'use-query-params';
import styled from "styled-components";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';

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
const StyledButton = styled(Button)`
  width: 100%;
`;
const Home = () => {
    const [url, setUrl] = useState("");
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
    const { register, handleSubmit, errors, reset } = useForm();

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
    };

    async function submitForm({ postcode, service_search }) {
        console.log('submitForm');
        if (isLoading) return;
    
        setIsLoading(true);

        // console.log("postcode:" + postcode);
        // check postcode is valid
        const validPostcode = postcodeValidator(postcode, 'UK');
        // console.log(validPostcode);
        // if (postcode) set in storage
        if (validPostcode) {
            localStorage.setItem("postcode", postcode);
        }

        setIsLoading(false);
    
    }
    // console.log('storage val');
    // console.log(localStorage.getItem("postcode"));

    // console.log(category_explorer);
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
                            // inputRef={emailRef}
                            register={register}
                            // required
                            // validate={{
                            //     pattern: (value) => {
                            //         return (
                            //             value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
                            //             "Enter a valid e-mail address"
                            //         );
                            //     },
                            // }}
                            // error={errors.postcode}
                        />
                        <FormInputSubmit
                            label="Search for a service"
                            placeholder="Search..."
                            name="service_search"
                            type="text"
                            register={register}
                            // error={errors.password}
                            // required
                        />
                        {/* <StyledButton type="submit" label="Login" disabled={isLoading} /> */}
                    </form>
                </HomeHeader>
                {/* <ListCategories category={category} onClick={handleEvent} /> */}
                <ListCategories onClick={handleEvent} />
            </div>
            </>
        )
    )
}

export default Home;
