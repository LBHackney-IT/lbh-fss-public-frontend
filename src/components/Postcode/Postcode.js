import React from "react";
import styled from "styled-components";

const PostcodeButton = styled.button`
    background: #005E48;
    color: #fff;
    border: 0;
    padding: 10px 15px;
    cursor: pointer;
    &::before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        content: "\f007";
        margin-right: 10px;
    }
`;


const Postcode = () => {
    return (
        <PostcodeButton>Postcode</PostcodeButton>
    );
}

export default Postcode;