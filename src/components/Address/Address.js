import React from "react";
import styled from "styled-components";

export const AddressList = styled.li`
    div {
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
    }
    span {
        display: block;
        font-size: 16px;
        margin-left: 19px;
        margin-top: 18px;
    }
`;

const Address = (props) => {
    const { address } = props;

    return(
        <AddressList key={address.uprn}>
            <div>
                <a href={`https://maps.google.com/?q=${address.address1}%20${address.address2}%20${address.city}%20${address.stateProvince}%20${address.postalCode}`} target="_blank" rel="noopener noreferrer">
                    {address.address1}<br></br>
                    {address.address2 ? address.address2 + ", " : ""}
                    {address.city ? address.city + ", " : ""}
                    {address.stateProvince ? address.stateProvince + ", " : ""}
                    {address.postalCode ? address.postalCode : ""}
                </a>
            </div>
            {(address.distance) !== null ? <span>{address.distance} away</span> : ""}
        </AddressList>
    );
}

export default Address;