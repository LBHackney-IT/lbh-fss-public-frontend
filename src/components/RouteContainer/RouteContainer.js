import React, { useState, useContext, useEffect } from "react";
import ListCategories from "../Category/ListCategories";
import CategoryExplorer from "../Category/CategoryExplorer";
// import ListServices from "../Service/ListServices";
// import ServiceDetails from "../Service/ServiceDetails";
import AppLoading from "../../AppLoading";
import UrlContext from "../../context/UrlContext/UrlContext";
import Home from "../Home/Home";

const RouteContainer = () => {
    const {url, setUrl} = useContext(UrlContext);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);

    useEffect(() => {
        async function checkQuery() {
            for (const [key, value] of Object.entries(url)) {
                console.log(key);
                if (key == "category_explorer" && value !== "") {
                    setPage("CategoryExplorer");
                } else if (key == "postcode" && value !== "" || key == "service_search" && value !== "") {
                    setPage("ListServices");
                } else if (key == "service" && value !== "") {
                    setPage("ServiceDetails");
                }
            }
        }
        checkQuery();
        setIsLoading(false);
    }, [setPage, setIsLoading]);

    // console.log("RouteContainer");
    return (
        isLoading ? ( <AppLoading /> ) :
        (
            ( page == "CategoryExplorer" ) ? <CategoryExplorer /> :
            ( page == "ListServices") ? "I would do something else, else" :
            ( page == "ServiceDetails" ) ? "Do this" :
            <Home />
        )
    )
}

export default RouteContainer;