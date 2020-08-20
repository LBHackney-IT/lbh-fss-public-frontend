import React, { useEffect, useState } from 'react';
// import Header from "./components/Header/Header";
// import UserContext from "./context/UserContext/UserContext";
import AppMain from "./AppMain";
import { GlobalStyle } from "./helpers/GlobalStyle/GlobalStyle";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ModalProvider } from "styled-react-modal";

const App = () => {

  return (
    <div className="App">
      {/* <UserContext.Provider value={userState}> */}
        {/* <Header /> */}
        <AppMain />
        {/* <ToastContainer /> */}
        <GlobalStyle />
      {/* </UserContext.Provider> */}
    </div>
  );

}


export default App;

