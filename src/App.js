import React, { useEffect, useState, useMemo } from 'react';
import RouteContainer from "./components/RouteContainer/RouteContainer";
import Home from "./components/Home/Home";
import { GlobalStyle } from "./helpers/GlobalStyle/GlobalStyle";
import UrlContext from "./context/UrlContext/UrlContext";
import PrevUrlContext from "./context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "./context/UrlParamsContext/UrlParamsContext";
import AppLoading from './AppLoading';
import Map from './components/Map/Map';
import { SidebarContainer } from "./util/styled-components/SidebarContainer"
import {ThemeProvider} from 'styled-components';

function App() {
  const [url, setUrl] = useState(""); // "" // ?hello_world=1 // ?category_explorer=5&somethingelse=1
  const urlValue = useMemo(() => ({ url, setUrl }), [url, setUrl]);
  const [prevUrl, setPrevUrl] = useState([]);
  const prevUrlValue = useMemo(() => ({ prevUrl, setPrevUrl }), [prevUrl, setPrevUrl]);
  const [urlParams, setUrlParams] = useState({});
  const urlParamValue = useMemo(() => ({ urlParams, setUrlParams }), [urlParams, setUrlParams]);
  const [isLoading, setIsLoading] = useState(true);
  const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
  // console.log("Start App");

  const theme = {
    breakpoints: { 
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  };

  useEffect(() => {
    async function storeQuery() {
      let paramObj = {};
      const currentSearch = window.location.search;
      if (currentSearch) {
        setUrl(currentSearch); // ?postcode&service=7&service_search=1
        let arr = [url];
        arr.push(currentSearch);
        setPrevUrl(arr); // ["", "?postcode&service=7&service_search=1"]

        const queryParts = currentSearch.substring(1).split(/[&;]/g);
        const arrayLength = queryParts.length;
        for (let i = 0; i < arrayLength; i++) {
          const queryKeyValue = queryParts[i].split("=");
          if (paramsArray.includes(queryKeyValue[0])) {
            // if (queryKeyValue[1]) {
              paramObj[queryKeyValue[0]] = queryKeyValue[1];
            // }
          } 
        }
        setUrlParams(paramObj);
      }
      setIsLoading(false);
    }
    // console.log("App useEffect");
    storeQuery();
  }, [setUrl, setPrevUrl, setUrlParams, setIsLoading]);
  
  // console.log(url);
  console.log("url");
  console.log(url);
  console.log("prevUrl");
  console.log(prevUrl);
  // console.log("App.js");
  return (
    isLoading ? <AppLoading /> :
    (
      <div className="App">
        <ThemeProvider theme={theme}>
          <UrlParamsContext.Provider value={urlParamValue}>
            <UrlContext.Provider value={urlValue}>
              <PrevUrlContext.Provider value={prevUrlValue}>
                <SidebarContainer>
                  { (Object.keys(urlParamValue.urlParams).length !== 0) ? <RouteContainer /> : <Home />  }
                </SidebarContainer>
                <Map />
                <GlobalStyle />
              </PrevUrlContext.Provider>
            </UrlContext.Provider>
          </UrlParamsContext.Provider>
        </ThemeProvider>
      </div>
    )
  )

}


export default App;