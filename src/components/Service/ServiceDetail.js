import React, {useState, useContext, useEffect} from "react";
import AppLoading from "../../AppLoading";
import GetServices from "../../services/GetServices/GetServices";
import ServiceCard from "./ServiceCard";
import styled from "styled-components";
import { darken } from "polished";
import { green, light, dark } from "../../settings";
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
import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import {MapContainer} from "../../util/styled-components/MapContainer";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon, Map as LeafletMap } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import getAllAddresses from "../../helpers/Mapbox/getAllAddresses";
import { GestureHandling } from 'leaflet-gesture-handling';
import {
  MAX_ZOOM,
  MIN_ZOOM,
  CENTER_DESKTOP_LEGEND,
  CENTER_DESKTOP_LEGEND_FULLSCREEN,
  CENTER_DESKTOP_NO_LEGEND,
  CENTER_DESKTOP_NO_LEGEND_FULLSCREEN,
  CENTER_MOBILE,
  CENTER_MOBILE_FULLSCREEN,
  DEFAULT_ZOOM_DESKTOP,
  DEFAULT_ZOOM_MOBILE,
  MAP_BOUNDS,
  HACKNEY_BOUNDS_1,
  HACKNEY_BOUNDS_2,
  HACKNEY_GEOSERVER_WMS,
  MAPBOX_TILES_URL,
  GENERIC_GEOLOCATION_ERROR,
  GENERIC_OUTSIDE_HACKNEY_ERROR,
  ATTRIBUTION
} from "../../helpers/GlobalVariables/GlobalVariables";
import { useMediaQuery } from 'react-responsive';

export const DetailContainer = styled.div`
    .service-info {
        ${breakpoint('md')`
            padding-bottom: 80px;
            overflow-y: scroll;
            height: 100vh;
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
        color: ${light["white"]};
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

const ServiceDetail = ({ onClick }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {urlParams} = useContext(UrlParamsContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const paramsArray = ["category_explorer", "postcode", "service_search", "service", "categories", "demographic"];
    const currentSearch = window.location.search;
    let paramObj = {};

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

    const select = e => {
        onClick(e);
    }

    let hero = "";
    if (data.images && data.images.medium.length) {
        hero = data.images.medium;
    }
  
    return isLoading ? (
            <AppLoading />
        ) : (
        <DetailContainer>
            <Header />
            <div className="service-info">
                {hero.length ? (
                    <div className="image-container">
                        <img src={hero} alt={data.name} />
                    </div>
                ) : ""}
                <GreyInnerContainer className="info">
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                    <h3>This is for:</h3>
                    <p>
                        {data.demographic.map(d => d.name).reduce((prev, curr) => [prev, ', ', curr])}
                    </p>
                </GreyInnerContainer>
                <InnerContainer>
                    <AccordionContainer>
                        <div className="category-header">   
                            <h3>We can help with:</h3>
                        </div>
                        <Accordion allowMultipleExpanded preExpanded={['hidden']}>
                            {data.categories.map((category) => {
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
                        {/* TODO */}
                        <li><a className="link-button" href={data.contact.website} target="_blank" rel="noopener noreferrer">Visit website</a></li>
                        <li><FontAwesomeIcon icon={["fas", "phone"]} /><a href={`tel://${data.contact.telephone}`}>{data.contact.telephone}</a></li>
                        <li><FontAwesomeIcon icon={["fas", "envelope"]} /><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></li>
                    </ul>
                </InnerContainer>
                <InnerContainer>
                    <h3>Referral details</h3>
                    <ul className="ul-no-style">
                        <li><FontAwesomeIcon icon={["fas", "external-link-square-alt"]} /><a href={data.referral.website} target="_blank" rel="noopener noreferrer">Visit website</a></li>
                        <li><FontAwesomeIcon icon={["fas", "envelope"]} /><a href={`mailto:${data.referral.email}`}>{data.referral.email}</a></li>
                    </ul>
                </InnerContainer>
                <InnerContainer>
                    <h3>Address</h3>
                    <ul className="ul-no-style">
                        {data.locations.map((location, index) =>
                            <Address key={index} address={location} />
                        )}
                    </ul>
                </InnerContainer>
                <Mobile>
                    <InnerMapContainer>
                        <Map className="markercluster-map"
                            center={CENTER_DESKTOP_LEGEND_FULLSCREEN}
                            zoom={MIN_ZOOM}
                            maxZoom={MAX_ZOOM}
                            zoomControl={false}
                            // bounds={MAP_BOUNDS}
                            maxBounds={MAP_BOUNDS}
                            gestureHandling
                        >
                            <ZoomControl position='topright' />
                            <TileLayer
                                attribution={ATTRIBUTION}
                                url={MAPBOX_TILES_URL}
                            />
                            <MarkerClusterGroup>
                                {
                                    getAllAddresses(data).map((service, index) => {
                                    
                                        const categoriesSorted = service["categories"].sort(function (a, b) {
                                            return a.weight - b.weight;
                                        });
        
                                        const categoryIconName = categoriesSorted[0].name.replaceAll(" ", "-").toLowerCase();
        
                                        const iconMarkup = renderToStaticMarkup(
                                            <div className="hackney-map-marker" data-category-icon={categoryIconName}>
                                            <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="3x" />
                                            <FontAwesomeIcon icon={["fas", "map-marker"]} size="3x" />
                                            </div>
                                        );
                                        const customMarkerIcon = divIcon({
                                            html: iconMarkup
                                        });
        
                                        const point = [parseFloat(service["locations"][0]['latitude']), parseFloat(service["locations"][0]['longitude'])];
                                        
                                        return (
                                            <Marker position={point} key={index} icon={customMarkerIcon} />
                                        )
                                    })
                                }
                            </MarkerClusterGroup>
                        </Map>
                    </InnerMapContainer>
                </Mobile>
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
                        <li><FontAwesomeIcon icon={["fab", "facebook-square"]} /><a href={data.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><FontAwesomeIcon icon={["fab", "twitter-square"]} /><a href={data.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><FontAwesomeIcon icon={["fab", "instagram-square"]} /><a href={data.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><FontAwesomeIcon icon={["fab", "linkedin"]} /><a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </InnerContainer>
            </div>
            <Desktop>
                <MapContainer>
                    <Map className="markercluster-map"
                        center={CENTER_DESKTOP_LEGEND_FULLSCREEN}
                        zoom={MIN_ZOOM}
                        maxZoom={MAX_ZOOM}
                        zoomControl={false}
                        // bounds={MAP_BOUNDS}
                        maxBounds={MAP_BOUNDS}
                        gestureHandling
                    >
                        <ZoomControl position='topright' />
                        <TileLayer
                            attribution={ATTRIBUTION}
                            url={MAPBOX_TILES_URL}
                        />
                        <MarkerClusterGroup>
                            {
                                getAllAddresses(data).map((service, index) => {
                                
                                    const categoriesSorted = service["categories"].sort(function (a, b) {
                                        return a.weight - b.weight;
                                    });

                                    const categoryIconName = categoriesSorted[0].name.replaceAll(" ", "-").toLowerCase();

                                    const iconMarkup = renderToStaticMarkup(
                                        <div className="hackney-map-marker" data-category-icon={categoryIconName}>
                                        <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="3x" />
                                        <FontAwesomeIcon icon={["fas", "map-marker"]} size="3x" />
                                        </div>
                                    );
                                    const customMarkerIcon = divIcon({
                                        html: iconMarkup
                                    });

                                    const point = [parseFloat(service["locations"][0]['latitude']), parseFloat(service["locations"][0]['longitude'])];
                                    
                                    return (
                                        <Marker position={point} key={index} icon={customMarkerIcon} />
                                    )
                                })
                            }
                        </MarkerClusterGroup>
                    </Map>
                </MapContainer>
            </Desktop>
        </DetailContainer>
    );
  };

export default ServiceDetail;