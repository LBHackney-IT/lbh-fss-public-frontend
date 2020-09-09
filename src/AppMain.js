import React, { useEffect, useState } from "react";
// import { Router, Link } from "@reach/router";
import ListCategories from "./components/Category/ListCategories";
// import ListServices from "./components/Service/ListServices";
// import ServiceDetail from "./components/Service/ServiceDetail";
import { useQueryParams, NumberParam } from 'use-query-params';
import CategoryExplorer from "./components/Category/CategoryExplorer";

const AppMain = () => {
  // const [isCategoryListing, setIsCategoryListing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  // console.log(categoryId); // null
  // const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
  const [{ category_explorer }, setQuery] = useQueryParams({ category_explorer: NumberParam });
  const [isLoading, setIsLoading] = useState(true);
  

  console.log('Appmain');
  // pre
  // categoryQuery() check to see if url has params
  // if yes, direct to page

  let paramObj = null;
  // const categoryQuery = (e) => {

    // const currentQueryString = window.location.search;
    // if (currentQueryString) {
        // const params = new URLSearchParams(window.location.search); 
        // for(var value of params.keys()) {
        //   paramObj[value] = params.get(value);
        // }
        // setCategoryId(paramObj);
    // }
    // console.log(paramObj);
    // console.log(categoryId);
    // console.log(paramObj);

  //   return;
  // }


  

  useEffect(() => {
    async function fetchMe() {
      let paramObj = {};
      const currentQueryString = window.location.search;
      const params = new URLSearchParams(window.location.search); 
        for(var value of params.keys()) {
          paramObj[value] = params.get(value);
        }
      
      setIsLoading(false);
      if (currentQueryString) {
        setCategoryId(paramObj);
      }
      // console.log(paramObj);
    // console.log(categoryId);
    }

    fetchMe();
  }, [categoryId, setIsLoading]);
  

  // if no, do this
  // useEffect(() => {
    // let catId = categoryQuery().category_explorer;
    // setQuery({ category_explorer: ~~ categoryId }, 'pushIn')
    // categoryQuery();
    // console.log("useeffect: " + categoryId);
    // setCategoryId(categoryId);
    // setIsCategoryListing(true);
  //   console.log({
  //     isCategoryListing,
  //     categoryId
        // });
  // }, [categoryId]);
  

  // 1. need to push category_explorer={id} immediately onclick
  // 2. store
  // 3. get query string
  const handleEvent = e => {
    setQuery({ category_explorer: ~~ e }, 'pushIn')
    // console.log(e);
    // categoryQuery();
    // setCategoryId(e);
    
  };

  console.log(categoryId); // null
  // return isLoading ? (
  //   "Loading"
  // ) : (
  //   categoryId !== null ? (
  //     <CategoryExplorer />
  //     // <ListCategories onClick={handleEvent} />
  //   ) : (
  //   <div className="Application">
  //     <h1>AppMain</h1>
  //     <ListCategories key="samwong" onClick={handleEvent} />
  //     {/* <CategoryExplorer /> */}
  //   </div>
  //   )
  // );

  return;
}

export default AppMain;
