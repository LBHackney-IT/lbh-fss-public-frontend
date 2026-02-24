import { useContext } from "react";
import Back from "../Back/Back";
import PostcodeButton from "../Postcode/PostcodeButton";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import styled from "styled-components";
import { green, light } from "../../settings";

const HeaderContainer = styled.div`
  display: flex;
  background: ${green["main"]};
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${green["light"]};
  position: relative;
  z-index: 1;
  h2 {
    color: ${light["white"]};
    font-weight: normal;
    font-size: 24px;
    letter-spacing: -0.0175em;
    margin-bottom: 0;
    margin-left: 15px;
  }
`;

const Header = () => {
  const { urlParams } = useContext(UrlParamsContext);
  let showPostcodeButton = true;
  let isHome = true;

  for (const [key] of Object.entries(urlParams)) {
    isHome = false;
    if (key == "set_postcode") {
      showPostcodeButton = false;
    }
  }

  return (
    <HeaderContainer className="no-print">
      {isHome ? <h2>Find support services</h2> : <Back />}
      {showPostcodeButton ? <PostcodeButton /> : ""}
    </HeaderContainer>
  );
};

export default Header;
