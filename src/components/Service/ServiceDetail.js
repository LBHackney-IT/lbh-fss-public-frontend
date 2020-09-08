import React, {useState, useContext, useEffect  } from "react";
import AppLoading from "../../AppLoading";
import GetServices from "../../services/GetServices/GetServices";
import styled from "styled-components";
import { darken } from "polished";
import breakpoint from 'styled-components-breakpoint';
import { InnerContainer } from "../../util/styled-components/InnerContainer";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import Address from "../Address/Address";

export const DetailContainer = styled.div`
    ${breakpoint('md')`
        padding-bottom: 40px;
        overflow-y: scroll;
        height: 100vh;
    `}
    .image-container {
        img {
            width: 100%;
            height: auto;
        }
    }
    .link-button {
        background: #00664F;
        border-radius: 3px;
        padding: 15px 30px;
        display: inline-block;
        color: #fff;
        text-decoration: none;
        &:hover {
            background-color: ${darken(0.1, "#00664F")};
        }
    }
`;

const GreyInnerContainer = styled(InnerContainer)`
    background: #F8F8F8;
<<<<<<< Updated upstream
=======
    margin-bottom: 15px;
    &.info {
        h2 {
            margin-bottom: 10px;
        }
        h3 {
            font-size: 16px;
            margin-bottom: 5px;
        }
        p {
            font-size: 16px;
            color: #525A5B;
            margin-top: 0;
        }
    }
>>>>>>> Stashed changes
`;

const ServiceDetail = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {urlParams} = useContext(UrlParamsContext);

    useEffect(() => {
        async function fetchData() {
            let serviceId = "";
            if (Object.entries(urlParams)[0] && Object.entries(urlParams)[0][0] == "service" && Object.entries(urlParams)[0][1] !== "") {
                serviceId = parseInt(Object.entries(urlParams)[0][1]);
            }
            const getService = await GetServices.getService(serviceId);
            setData(getService || []);
            setIsLoading(false);
        }
        fetchData();

    }, [setData, setIsLoading]);

    let hero = "";
    if (data.images && data.images.medium.length) {
        hero = data.images.medium;
    }
  
    return isLoading ? (
            <AppLoading />
        ) : (
        <DetailContainer>
            {hero.length ? (
                <div className="image-container">
                    <img src={hero} alt={data.name} />
                </div>
            ) : ""}
            <GreyInnerContainer className="info">
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <h3>This is for:</h3>
                <div>
                    {data.demographic.map(d => d.name).reduce((prev, curr) => [prev, ', ', curr])}
                </div>
            </GreyInnerContainer>
            <InnerContainer>
                <div>   
                    <h3>We can help with:</h3>
                    {/* TODO */}
                    {`<Open all>`}
                </div>
                {/* TODO */}
                {`{data.categories}`}
                {/* {data.categories} */}
            </InnerContainer>
            <InnerContainer>
                <h3>Contact us</h3>
                <ul className="ul-no-style">
                    {/* TODO */}
                    <li><a className="link-button" href={data.contact.website} target="_blank">Visit website</a></li>
                    <li><a href={`tel://${data.contact.telephone}`}>{data.contact.telephone}</a></li>
                    <li><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></li>
                </ul>
            </InnerContainer>
            <InnerContainer>
                <h3>Referral details</h3>
                <ul className="ul-no-style">
                    {/* TODO */}
                    <li><a href={data.referral.website} target="_blank">Visit website</a></li>
                    <li><a href={`mailto:${data.referral.email}`}>{data.referral.email}</a></li>
                </ul>
            </InnerContainer>
            <InnerContainer>
                <h3>Address</h3>
                <ul className="ul-no-style">
                    {data.locations.map(location =>
                        <Address address={location} />
                    )}
                </ul>
            </InnerContainer>
            <div>
                {/* TODO */}
                {`<Map>`}
            </div>
            <GreyInnerContainer>
                <ul className="ul-no-style">
                    {/* TODO */}
                    <li>{`<Share>`}</li>
                    <li>{`<Print>`}</li>
                </ul>   
            </GreyInnerContainer>
            <InnerContainer>
                <h3>Follow {data.name}</h3>
                <ul className="ul-no-style">
                    {/* TODO */}
                    <li><a href={data.social.facebook} target="_blank">Facebook</a></li>
                    <li><a href={data.social.twitter} target="_blank">Twitter</a></li>
                    <li><a href={data.social.instagram} target="_blank">Instagram</a></li>
                    <li><a href={data.social.linkedin} target="_blank">LinkedIn</a></li>
                </ul>
            </InnerContainer>
        </DetailContainer>
    );
  };

export default ServiceDetail;