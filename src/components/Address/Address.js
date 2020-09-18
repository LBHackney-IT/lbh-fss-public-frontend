import React from "react";
import styled from "styled-components";

export const AddressList = styled.li`
    display: flex;
    align-items: center;
    &::before {
        display: none;
        font-family: "Font Awesome 5 Pro";
        font-weight: 900;
        content: "\f3c5";
    }
    svg {
        margin-right: 10px;
    }
`;

const Address = (props) => {
    const { address } = props;

    return(
        <AddressList key={address.uprn}>
            <a href={`https://maps.google.com/?q=${address.address1}%20${address.address2}%20${address.city}%20${address.stateProvince}%20${address.postalCode}`} target="_blank" rel="noopener noreferrer">
                {address.address1}<br></br>
                {address.address2 ? address.address2 + ", " : ""}
                {address.city ? address.city + ", " : ""}
                {address.stateProvince ? address.stateProvince + ", " : ""}
                {address.postalCode ? address.postalCode : ""}
            </a>
        </AddressList>
    );
}

export default Address;