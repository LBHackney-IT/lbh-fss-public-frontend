import React, { useEffect, useState, useMemo } from 'react';
// import Header from "./components/Header/Header";
import AppMain from "./AppMain";
import RouteContainer from "./components/RouteContainer/RouteContainer";
import Home from "./components/Home/Home";
import { GlobalStyle } from "./helpers/GlobalStyle/GlobalStyle";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ModalProvider } from "styled-react-modal";
import UrlContext from "./context/UrlContext/UrlContext";
import AppLoading from './AppLoading';
import history from './history';

function App() {
  const [url, setUrl] = useState("");
  const [urlParams, setUrlParams] = useState({});
  const urlValue = useMemo(() => ({ urlParams, setUrlParams }), [urlParams, setUrlParams]);
  const [isLoading, setIsLoading] = useState(true);
  const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
  // console.log("Start App");
  
  useEffect(() => {
    async function storeQuery() {
      let paramObj = {};
      const currentSearch = window.location.search;
      if (currentSearch) {
        setUrl(currentSearch); // ?postcode&service=7&service_search=1

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
    // console.log("App useEffect");
    storeQuery();
  }, [setUrlParams, setIsLoading]);

  // console.log("App.js");
  return (
    isLoading ? <AppLoading /> :
    (
      <div className="App">
        <UrlContext.Provider value={urlValue}>
          { (Object.keys(urlValue.urlParams).length !== 0) ? <RouteContainer /> : <Home />  }
          <GlobalStyle />
        </UrlContext.Provider>
      </div>
    )
  )

}


export default App;