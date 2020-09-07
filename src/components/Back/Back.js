import React from "react";
import styled from "styled-components";

const BackButton = styled.button`
    border: 0;
    padding: 10px 15px;
    background: transparent;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    &::before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        content: "\f007";
        margin-right: 10px;
    }
`;


const Back = () => {
    return (
        <BackButton>Back</BackButton>
    );
}

export default Back;