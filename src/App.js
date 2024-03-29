import React, { useEffect, useState, useMemo } from 'react';
import RouteContainer from "./components/RouteContainer/RouteContainer";
import Home from "./components/Home/Home";
import { GlobalStyle } from "./helpers/GlobalStyle/GlobalStyle";
import UrlContext from "./context/UrlContext/UrlContext";
import PrevUrlContext from "./context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "./context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "./context/PrevUrlParamsContext/PrevUrlParamsContext";
import MapToggleContext from "./context/MapToggleContext/MapToggleContext";
import AppLoading from './AppLoading';
import CookieBannerDisplay from "./components/CookieBanner/CookieBanner";
import { SidebarContainer } from "./util/styled-components/SidebarContainer";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import {ThemeProvider} from 'styled-components';
import "react-leaflet-markercluster/dist/styles.min.css";
import "./App.scss";

function App() {
  const [url, setUrl] = useState("");
  const urlValue = useMemo(() => ({ url, setUrl }), [url, setUrl]);
  const [prevUrl, setPrevUrl] = useState([]);
  const prevUrlValue = useMemo(() => ({ prevUrl, setPrevUrl }), [prevUrl, setPrevUrl]);
  const [urlParams, setUrlParams] = useState({});
  const urlParamValue = useMemo(() => ({ urlParams, setUrlParams }), [urlParams, setUrlParams]);
  const [prevUrlParams, setPrevUrlParams] = useState([]);
  const prevUrlParamsValue = useMemo(() => ({ prevUrlParams, setPrevUrlParams }), [prevUrlParams, setPrevUrlParams]);
  const [mapToggle, setMapToggle] = useState("false");
  const mapToggleValue = useMemo(() => ({ mapToggle, setMapToggle }), [mapToggle, setMapToggle]);
  const [isLoading, setIsLoading] = useState(true);
  const paramsArray = ["category_explorer", "postcode", "service_search", "support_service", "categories", "demographic", "set_postcode", "select_categories", "select_demographics", "map_toggle"];

  const theme = {
    breakpoints: { 
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  };

  var COOKIE_NAME = 'seen_cookie_message'

  const checkCookie = () => {
    var nameEQ = COOKIE_NAME + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }
    return null
  }

  useEffect(() => {
    async function storeQuery() {
      let paramObj = {};
      const currentSearch = window.location.search;
      if (currentSearch) {
        setUrl(currentSearch);

        const queryParts = currentSearch.substring(1).split(/[&;]/g);
        const arrayLength = queryParts.length;
        for (let i = 0; i < arrayLength; i++) {
          const queryKeyValue = queryParts[i].split("=");
          if (paramsArray.includes(queryKeyValue[0])) {
            paramObj[queryKeyValue[0]] = queryKeyValue[1];
          }
        }
        setUrlParams(paramObj);
      }
      setIsLoading(false);
    }
    storeQuery();

  }, [setUrl, setPrevUrl, setUrlParams, setIsLoading]);

  // rewrite postcode param if changed from url
  if (Object.keys(urlParams).length !== 0) {
    let postcode = [urlParams].find(postcode => postcode);
    postcode = postcode.postcode;
    const validPostcode = postcodeValidator(postcode, 'UK');
    if (validPostcode) {
      localStorage.setItem("postcode", postcode);
    }
  }

  return (
    isLoading ? <AppLoading /> :
    (
      <>
       { checkCookie() ? '' : <CookieBannerDisplay /> }
        <div className="App">
          <ThemeProvider theme={theme}>
            <UrlParamsContext.Provider value={urlParamValue}>
              <UrlContext.Provider value={urlValue}>
                <PrevUrlContext.Provider value={prevUrlValue}>
                  <PrevUrlParamsContext.Provider value={prevUrlParamsValue}>
                    <MapToggleContext.Provider value={mapToggleValue}>
                      <SidebarContainer>
                        { (Object.keys(urlParamValue.urlParams).length !== 0) ? <RouteContainer /> : <Home /> }
                      </SidebarContainer>
                      <GlobalStyle />
                    </MapToggleContext.Provider>
                  </PrevUrlParamsContext.Provider>
                </PrevUrlContext.Provider>
              </UrlContext.Provider>
            </UrlParamsContext.Provider>
          </ThemeProvider>
        </div>
      </>
    )
  )

}


export default App;