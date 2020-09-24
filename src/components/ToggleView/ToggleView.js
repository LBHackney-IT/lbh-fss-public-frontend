import React, {useContext, useState, useEffect} from "react";
import styled from "styled-components";
import { applyStyleModifiers } from 'styled-components-modifiers';
import Button from "../Button/Button";
import { darken } from "polished";
import { green, light } from "../../settings";
import UrlContext from "../../context/UrlContext/UrlContext";
import UrlParamsContext from "../../context/UrlParamsContext/UrlParamsContext";
import MapToggleContext from "../../context/MapToggleContext/MapToggleContext";
import history from '../../history';

const ToggleViewContainer = styled.div`
    display: flex;
    padding: 20px 15px 0;
    align-items: center;
    aside {
        font-size: 14px;
    }
    div {
        display: flex;
        &.list-enabled {
            .map-services-button {
                background: transparent;
                border: 1px solid ${green["ghost"]};
                border-radius: 5px;
                color: ${green["main"]};
                &:hover, &:focus {
                    background-color: ${darken(0.1, green["bright"])};
                    color: ${light["white"]};
                    svg {
                        color: ${light["white"]};
                    }
                }
                
                svg {
                    color: ${green["main"]};
                }
            }
        }
        &.map-enabled {
            .list-services-button {
                background: transparent;
                border: 1px solid ${green["ghost"]};
                border-radius: 5px;
                color: ${green["main"]};
                &:hover, &:focus {
                    background-color: ${darken(0.1, green["bright"])};
                    color: ${light["white"]};
                    svg {
                        color: ${light["white"]};
                    }
                }
                svg {
                    color: ${green["main"]};
                }
            }
        }
    }
`;

export const BUTTON_MODIFIERS = {
    mapButton: () => `
        &::before {
            content: "\f3c5";
        }
    `
}

const StyledButton = styled(Button)`
    background: ${green["main"]};
    border: 1px solid ${green["ghost"]};
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
    margin-bottom: 0;
    padding: 10px 5px;
    color: ${light["white"]};
    cursor: pointer;
    &:hover {
        background-color: ${darken(0.1, green["bright"])};
        color: ${light["white"]};
    }
    &::before {
        display: none;
        font-family: "Font Awesome 5 Pro";
        font-weight: 900;
        content: "\f0c9";
    }
    svg {
        margin-right: 5px;
    }

    ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;

const ToggleView = () => {
    const {url, setUrl} = useContext(UrlContext);
    const {urlParams, setUrlParams} = useContext(UrlParamsContext);
    const {mapToggle, setMapToggle} = useContext(MapToggleContext);
    const [style, setStyle] = useState("list-enabled");
    
    let push = url;
    let params = urlParams;

    function toggleView(v) {
        params["map_toggle"] = v;
        push = "?" + new URLSearchParams(params).toString();
        push = push.replaceAll("=undefined", "");
        history.push(push);
        setUrl(push);
        setUrlParams(params);
    }

    useEffect(() => {
        if (mapToggle === "true") {
            setStyle("map-enabled");
        } else {
            setStyle("list-enabled");
        }
    });

    const listEvent = e => {
        toggleView("false");
        setMapToggle("false");
    };
    const mapEvent = e => {
        toggleView("true");
        setMapToggle("true");
    };

    return (
        <ToggleViewContainer>
            <aside>View as:</aside>
            <div className={style}>
                <StyledButton className="list-services-button" type="button" label="List" onClick={listEvent} />
                <StyledButton modifiers="mapButton" className="map-services-button" type="button" label="Map" onClick={mapEvent} />
            </div>
        </ToggleViewContainer>
    );
}

export default ToggleView;