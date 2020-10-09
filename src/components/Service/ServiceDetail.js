import React, {useState, useContext, useEffect, useRef, Fragment} from "react";
import AppLoading from "../../AppLoading";
import GetServices from "../../services/GetServices/GetServices";
import GetTaxonomies from "../../services/GetTaxonomies/GetTaxonomies";
import styled from "styled-components";
import { darken } from "polished";
import { green, blue, light, dark } from "../../settings";
import breakpoint from 'styled-components-breakpoint';
import { InnerContainer } from "../../util/styled-components/InnerContainer";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Address from "../Address/Address";
import Header from "../Header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionSheet from 'actionsheet-react';
import Share from "../Share/Share";
import {MapContainer} from "../../util/styled-components/MapContainer";
import HackneyMap from "../HackneyMap/HackneyMap";
import { useMediaQuery } from 'react-responsive';
import ReactToPrint from 'react-to-print';

export const DetailContainer = styled.div`
    .service-info {
        ${breakpoint('md')`
            overflow-y: scroll;
            height: calc(100vh - 100px);
            position: relative;
            z-index: 1;
            background: ${light["white"]};
        `}
    }
    .image-container {
        img {
            width: 100%;
            height: auto;
        }
    }
    .link-button {
        background: ${green["main"]};
        border-radius: 3px;
        padding: 15px 30px;
        display: inline-block;
        color: ${light["white"]} !important;
        text-decoration: none;
        &:hover {
            background-color: ${darken(0.1, green["main"])};
        }
    }
    h3 {
        font-size: 19px;
        margin-bottom: 15px;
    }
    ul {
        li {
            font-size: 19px;
        }
    }
    #fss--social-share-overlay {
        > div:first-of-type {
            display: none;
        }
    }
    .fss--social-share, .print-button {
        display: block;
        border: 0;
        background: transparent;
        cursor: pointer;
        padding: 0;
        font-size: 19px;
        color: ${blue["link"]};
        text-decoration: underline;
        &:hover {
            color: ${darken(0.1, blue["link"])};
        }
        svg {
            margin-right: 5px;
            color: #000;
        }
    }
    .print-button {
        margin-top: 15px !important;
    }
    .print-only, .page-break {
        display: none;
    }
    @media print {
        @page { size: landscape; }
        .print-only {
            display: inline;
        }
        .page-break {
            margin-top: 3.5rem;
            display: block;
            page-break-before: always;
        }
        .no-print {
            display: none !important;
            visibility: hidden !important;
        }
        .image-container {
            width: 400px;
            height: 200px;
            break-inside: avoid;
        }
        a {
            text-decoration: none;
            color: ${dark["offBlack"]};
        }
        .fa-map-marker-alt {
            margin-top: -10px !important;
        }
        .accordion__button {
            .fa-plus, .fa-minus {
                display: none;
            }
        }
        .accordion__panel {
            display: block;
        }
    }
`;

export const InnerMapContainer = styled.div`
    .leaflet-container {
        height: 450px;
    }
`;

const GreyInnerContainer = styled(InnerContainer)`
    background: ${light["grey"]};
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
            color: ${dark["grey"]};
            margin-top: 0;
        }
    }
`;

export const AccordionContainer = styled.div`
    .category-header {
        margin-bottom: 20px;
    }
    h3 {
        font-size: 16px;
        color: ${dark["grey"]};
        margin-bottom: 0;
    }
    .accordion__item {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        + .accordion__item {
            margin-top: 15px;
        }
        &.hidden-item {
            margin: 0;
        }
    }
    .accordion__button {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 19px;
        font-weight: bold;
        &::after {
            display: none;
            font-family: "Font Awesome 5 Pro";
            font-weight: 900;
            content: '\f067';
        }
        svg {
            margin-left: auto;
            color: #525A5B;
            font-size: 17px;
        }
        &[aria-expanded="true"] {
            &::after {
                content: '\f068';
            }
        }
        i {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            svg {
                margin-right: auto;
                font-size: 16px;
                color: #fff;
            }
        }
    }
    .accordion__panel {
        margin-left: 35px;
        margin-top: 5px;
        position: relative;
        font-size: 16px;
        color: ${dark["grey"]};
        &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: -20px;
            width: 1px;
            height: calc(100% - 5px);
            background: ${green["ghost"]};
        }
    }
`;

export const ActionSheetContainer = styled.div`
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media print {
        display: none !important;
        visibility: hidden !important;
    }
`;

const ServiceDetail = () => {
    const [data, setData] = useState([]);
    const [demographicData, setDemographicData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {urlParams} = useContext(UrlParamsContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const paramsArray = ["category_explorer", "postcode", "service_search", "support_service", "categories", "demographic"];
    const currentSearch = window.location.search;
    const storedPostcode = localStorage.getItem("postcode");
    let paramObj = {};

    useEffect(() => {
        async function fetchData() {
            let serviceId = "";
            if (Object.entries(urlParams)[0] && Object.entries(urlParams)[0][0] == "support_service" && Object.entries(urlParams)[0][1] !== "") {
                serviceId = parseInt(Object.entries(urlParams)[0][1]);
            }
            const getService = await GetServices.getService({id: serviceId, postcode: storedPostcode});
            setData(getService || []);
            const getDemographics = await GetTaxonomies.retrieveTaxonomies({vocabulary: "demographic"});
            setDemographicData(getDemographics || []);
            setIsLoading(false);
        }
        fetchData();

        if (prevUrl.length == 0 && prevUrlParams.length == 0) {
            let prevUrlArray = [""];
            let prevUrlParamsArray = [{}];
      
            // setPrevUrl
            if (currentSearch) {
                prevUrlArray.push(currentSearch);
                setPrevUrl(prevUrlArray);
            }
      
            // setPrevUrlParams
            createParamObj(currentSearch, paramsArray);
            prevUrlParamsArray.push(paramObj);
            setPrevUrlParams(prevUrlParamsArray);
        }

    }, [setData, setIsLoading]);

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 768 })
        return isDesktop ? children : null
    }

    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }

    function createParamObj(currentSearch, paramsArray) {
        const queryParts = currentSearch.substring(1).split(/[&;]/g);
        const arrayLength = queryParts.length;
        for (let i = 0; i < arrayLength; i++) {
            const queryKeyValue = queryParts[i].split("=");
            if (paramsArray.includes(queryKeyValue[0])) {
                paramObj[queryKeyValue[0]] = queryKeyValue[1];
            } 
        }
    }

    let hero = "";
    if (data.service !== undefined && data.service.images !== undefined && data.service.images.medium.length) {
        hero = data.service.images.medium;
    }

    const ref = useRef();
    const componentRef = useRef();
 
    const handleOpen = () => {
        ref.current.open();
        document.getElementById("fss--social-share-overlay").childNodes[0].style.display = "block";
    }

    const handleClose = () => {
        ref.current.close();
        document.getElementById("fss--social-share-overlay").childNodes[0].style.display = "none";
    }

    const serviceArray = [data.service];
  
    return isLoading ? (
            <AppLoading />
        ) : (
        <DetailContainer ref={componentRef}>
            <Desktop>
                <MapContainer>
                    <div className="page-break" />
                    <HackneyMap data={data} />
                </MapContainer>
            </Desktop>
            <Header />
            <div className="service-info">
                {hero.length ? (
                    <div className="image-container">
                        <img src={hero} alt={data.service.name} />
                    </div>
                ) : ""}
                <GreyInnerContainer className="info">
                    <h2>{data.service.name}</h2>
                    <p>{data.service.description}</p>
                    <h3>This is for:</h3>
                    <p>
                        {(data.service.demographic.length && data.service.demographic.length === demographicData.length) ? "Everyone" : data.service.demographic.map(d => d.name).reduce((prev, curr) => [prev, ', ', curr])}
                    </p>
                </GreyInnerContainer>
                <InnerContainer>
                    <AccordionContainer>
                        <div className="category-header">   
                            <h3>We can help with:</h3>
                        </div>
                        <Accordion allowMultipleExpanded preExpanded={['hidden']}>
                            {data.service.categories.map((category) => {
                                const categoryIconName = category.name.replaceAll(" ", "-").toLowerCase();
                                return (
                                    <AccordionItem key={category.id}>
                                        <AccordionItemHeading className="category-icons" data-category-icon={categoryIconName}>
                                            <AccordionItemButton>
                                                <i><span className="hideVisually">{`Icon for ${category.name} `}</span></i>
                                                {category.name}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {category.description}
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                );
                            })}
                            <AccordionItem key="hidden" uuid="hidden" className="hidden-item" />
                        </Accordion>
                    </AccordionContainer>
                </InnerContainer>
                <InnerContainer>
                    <h3>Contact us</h3>
                    <ul className="ul-no-style">
                        <li className="no-print"><a className="link-button" href={data.service.contact.website} target="_blank" rel="noopener noreferrer">Visit website</a></li>
                        <li className="print-only"><a className="link-button" href={data.service.contact.website}>Visit website: {data.service.contact.website}</a></li>
                        <li><FontAwesomeIcon icon={["fas", "phone"]} /><a href={`tel://${data.service.contact.telephone}`}>{data.service.contact.telephone}</a></li>
                        <li><FontAwesomeIcon icon={["fas", "envelope"]} /><a href={`mailto:${data.service.contact.email}`}>{data.service.contact.email}</a></li>
                    </ul>
                </InnerContainer>
                <InnerContainer>
                    <h3>Referral details</h3>
                    <ul className="ul-no-style">
                        <li><FontAwesomeIcon icon={["fas", "external-link-square-alt"]} /><a href={data.service.referral.website} target="_blank" rel="noopener noreferrer">Visit website<span className="print-only">: {data.service.referral.website}</span></a></li>
                        <li><FontAwesomeIcon icon={["fas", "envelope"]} /><a href={`mailto:${data.service.referral.email}`}>{data.service.referral.email}</a></li>
                    </ul>
                </InnerContainer>
                <InnerContainer>
                    <h3>Address</h3>
                    <ul className="ul-no-style">
                        {
                            serviceArray.map((service, index) => {
                                const locationSorted = service.locations.sort(function (a, b) {
                                    return parseFloat(a.distance) - parseFloat(b.distance);
                                });
                                return locationSorted.map((location, index) =>
                                    <Address key={index} address={location} />
                                );
                            })
                        }
                    </ul>
                </InnerContainer>
                <Mobile>
                    <InnerMapContainer className="inner-map-container">
                        <HackneyMap data={data} />
                    </InnerMapContainer>
                </Mobile>
              <GreyInnerContainer className="no-print">
                <button onClick={handleOpen} className="fss--social-share">
                    <FontAwesomeIcon icon={["fas", "share-square"]} />
                    Share
                </button>
                <div id="fss--social-share-overlay" onClick={handleClose}>
                    <ActionSheet ref={ref}>
                        <ActionSheetContainer>
                            <h3>Share</h3>
                            <Share service={data} />
                        </ActionSheetContainer>
                    </ActionSheet>
                </div>
                <ReactToPrint
                    trigger={() => <button className="print-button"><FontAwesomeIcon icon={["fas", "print"]} />Print</button>}
                    content={() => componentRef.current}
                />
              </GreyInnerContainer>
              <InnerContainer>
                <h3>Follow {data.service.name}</h3>
                <ul className="ul-no-style">
                    {(data.service.social.facebook) ? <li><FontAwesomeIcon icon={["fab", "facebook-square"]} /><a href={data.service.social.facebook} target="_blank" rel="noopener noreferrer">Facebook<span className="print-only">: {data.service.social.facebook}</span></a></li> : ""}
                    {(data.service.social.twitter) ? <li><FontAwesomeIcon icon={["fab", "twitter-square"]} /><a href={data.service.social.twitter} target="_blank" rel="noopener noreferrer">Twitter<span className="print-only">: {data.service.social.twitter}</span></a></li> : ""}
                    {(data.service.social.instagram) ? <li><FontAwesomeIcon icon={["fab", "instagram-square"]} /><a href={data.service.social.instagram} target="_blank" rel="noopener noreferrer">Instagram<span className="print-only">: {data.service.social.instagram}</span></a></li> : ""}
                    {(data.service.social.linkedin) ? <li><FontAwesomeIcon icon={["fab", "linkedin"]} /><a href={data.service.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="print-only">: {data.service.social.linkedin}</span></a></li> : ""}
                </ul>
              </InnerContainer>
            </div>
            
        </DetailContainer>
    );
  };

export default ServiceDetail;