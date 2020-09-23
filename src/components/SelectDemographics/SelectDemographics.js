import React, { useEffect, useState, useContext, useRef } from "react";
import AppLoading from "../../AppLoading";
import Header from "../Header/Header";
import UrlContext from "../../context/UrlContext/UrlContext";
import PrevUrlContext from "../../context/PrevUrlContext/PrevUrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import PrevUrlParamsContext from "../../context/PrevUrlParamsContext/PrevUrlParamsContext";
import FormInput from "../FormInput/FormInput";
import FormError from "../FormError/FormError";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';
import history from '../../history';
import { dark, red } from "../../settings";
import { Map, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import {MapContainer} from "../../util/styled-components/MapContainer";
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

export const SetPostcodeContainer = styled.div`
    padding: 20px 15px;
    h2 {
        font-size: 27px;
        font-weight: normal;
        margin-bottom: 10px;
    }
    p {
        font-size: 19px;
        color: ${dark["grey"]};
    }
    input[name=postcode] {
        border: 2px solid ${dark["offBlack"]};
        box-sizing: border-box;
        border-radius: 3px;
    }
    span[role=alert] {
        color: ${red["error"]};
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
    border-radius: 3px;
    border-bottom: 2px solid ${dark["black"]};
`;

const SelectDemographics = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {prevUrl, setPrevUrl} = useContext(PrevUrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {prevUrlParams, setPrevUrlParams} = useContext(PrevUrlParamsContext);
    const [isLoading, setIsLoading] = useState(true);
    const paramsArray = ["category_explorer", "postcode" , "service_search", "service"];
    const { register, handleSubmit, errors, reset } = useForm();
    const storedPostcode = localStorage.getItem("postcode");

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    async function submitForm({ postcode }) {
        if (isLoading) return;
        const prevUrlArrayLast = prevUrl[prevUrl.length - 1];
        const prevUrlParamsArrayLast = prevUrlParams[prevUrlParams.length - 1];
        
        const validPostcode = postcodeValidator(postcode, 'UK');
        if (validPostcode) {
            localStorage.setItem("postcode", postcode);
            let push = "?postcode="+postcode+"&service_search";
            let params = {"postcode": postcode, "search_service": undefined};

            if (prevUrl.length !== 0 && prevUrlParams.length !== 0) {
                push = prevUrlArrayLast;
                params = prevUrlParamsArrayLast;
                
                // if service exists in prevUrlParams
                const serviceObj = prevUrlParams.find(serviceObj => serviceObj.service);
                if (serviceObj !== undefined) {
                    //
                } else {
                    // if postcode exists in prevUrlParams
                    let ListServicesPostcodeObj = prevUrlParams.find(ListServicesPostcodeObj => ListServicesPostcodeObj.postcode);
                    if (ListServicesPostcodeObj !== undefined) {
                        // replace previous postcode with new value
                        ListServicesPostcodeObj.postcode = postcode;
                        push = "?" + new URLSearchParams(ListServicesPostcodeObj).toString();
                        push = push.replaceAll("=undefined", "");
                        params = ListServicesPostcodeObj;
                    }
                    // if service_search exists in prevUrlParams
                    const ListServicesSearchObj = prevUrlParams.find(ListServicesSearchObj => ListServicesSearchObj.service_search);
                    if (ListServicesSearchObj !== undefined) {
                        push = "?" + new URLSearchParams(ListServicesSearchObj).toString();
                        push = push.replaceAll("=undefined", "");
                        params = ListServicesSearchObj;
                    }
                }
            }

            history.push(push);
            setUrl(push);
            setUrlParams(params);
        }
    }

    return (
        isLoading ? (
            <AppLoading />
        ) : (
            <>
            <div className="">
                <Header />
                TODO SELECT DEMOGRAPHICS
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
                    </Map>
                </MapContainer>
            </div>
            </>
        )
    )
}

export default SelectDemographics;