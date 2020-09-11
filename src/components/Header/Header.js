import React from "react";
import Back from "../Back/Back";
import Postcode from "../Postcode/Postcode";
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    background: #00664F;
    justify-content: space-between;
    border-bottom: 1px solid #7FB2A7;
`;

const Header = () => {  
    return (
        <HeaderContainer>
            <Back />
            <Postcode />
        </HeaderContainer>
    );
}

export default Header;