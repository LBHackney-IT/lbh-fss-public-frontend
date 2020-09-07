import React, { useEffect, useState, useContext } from "react";
import AppLoading from "../../AppLoading";
import ListCategories from "../Category/ListCategories";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import FormInput from "../FormInput/FormInput";
import FormInputSubmit from "../FormInputSubmit/FormInputSubmit";
import { useForm } from "react-hook-form";
import { useQueryParams, NumberParam } from 'use-query-params';
import styled from "styled-components";

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

    async function doLogin({ email, password }) {
        if (isLoading) return;
    
        setIsLoading(true);

        //
    
        setIsLoading(false);
    
    }

    console.log(category_explorer);
    // console.log('Home');
    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <div className="Home">
                <HomeHeader>
                    <h2>Find support services</h2>
                    <form onSubmit={handleSubmit(doLogin)} data-testid="form">
                        <FormInput
                            label="Enter a postcode"
                            placeholder="Set your postcode e.g E8 1DY"
                            name="postcode"
                            // inputRef={emailRef}
                            register={register}
                            required
                            validate={{
                                pattern: (value) => {
                                    return (
                                        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
                                        "Enter a valid e-mail address"
                                    );
                                },
                            }}
                            // error={errors.email}
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
                    </form>
                </HomeHeader>
                {/* <ListCategories category={category} onClick={handleEvent} /> */}
                <ListCategories onClick={handleEvent} />
            </div>
        )
    )
}

export default Home;
