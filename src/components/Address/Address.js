import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddressList = styled.li`
    div {
        display: flex;
        align-items: center;
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
    let storedPostcode = localStorage.getItem("postcode");
    storedPostcode = (storedPostcode) ? storedPostcode : "";

    return(
        <AddressList key={address.uprn}>
            <div>
                <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
                <a href={`https://www.google.com/maps/dir/${storedPostcode}/${address.address1}%20${address.address2}%20${address.city}%20${address.stateProvince}%20${address.postalCode}`} target="_blank" rel="noopener noreferrer">
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