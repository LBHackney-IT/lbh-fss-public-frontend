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
  const urlState = useState(false);
  const [url, setUrl] = useState({});
  const urlValue = useMemo(() => ({ url, setUrl }), [url, setUrl]);
  const [isLoading, setIsLoading] = useState(true);
  const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
  // console.log("Start App");

  useEffect(() => {
    async function storeQuery() {
      let paramObj = {};
      const currentQueryString = window.location.search;
      if (currentQueryString) {
        const params = new URLSearchParams(window.location.search); 
        for (const [key, value] of params.entries()) {
          if (paramsArray.includes(key)) {
            if (value) {
              paramObj[key] = key;
              paramObj[value] = value;
            }
          }
        }
        setUrl(paramObj);
      }
      setIsLoading(false);
    }
    console.log("App useEffect");
    storeQuery();
  }, [setUrl, setIsLoading]);

  

  // console.log("App.js");
  return (
    isLoading ? <AppLoading /> :
    (
      <div className="App">
        <UrlContext.Provider value={urlValue}>
          { (Object.keys(urlValue.url).length !== 0) ? <RouteContainer /> : <Home />  }
          <GlobalStyle />
        </UrlContext.Provider>
      </div>
    )
  )

}


export default App;