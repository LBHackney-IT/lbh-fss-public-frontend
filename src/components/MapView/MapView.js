import React from "react";
import styled from "styled-components";
import { applyStyleModifiers } from 'styled-components-modifiers';
import Button from "../Button/Button";
import { darken } from "polished";
import { green, light } from "../../settings";

const MapViewContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    aside {
        font-size: 14px;
    }
    div {
        display: flex;
    }
`;

export const BUTTON_MODIFIERS = {
    ghostButton: () => `
        border: 1px solid ${green["ghost"]};
        border-radius: 5px;
        color: ${green["main"]};
        span {
            &::before {
                content: "\f3c5";
            }
            svg {
                color: ${green["main"]};
            }
        }
    `
}

    // ${applyStyleModifiers(BUTTON_MODIFIERS)};

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
    &:hover {
        background-color: ${darken(0.1, green["bright"])};
    }
    &::before {
        display: none;
        font-family: "Font Awesome 5 Pro";
        font-weight: 900;
        content: "\f0c9";
    }
`;

const MapView = () => {
    return (
        <MapViewContainer>
            <aside>View as:</aside>
            <div>
                <StyledButton type="button" label="List" />
                <StyledButton type="button" label="Map" />
            </div>
        </MapViewContainer>
    );
}

export default MapView;