// import React from 'react';
import styled from "styled-components";
import { applyStyleModifiers } from 'styled-components-modifiers';
import { pink, dark, light } from "../../settings";
import arrowRight from "../../assets/arrow-right.svg";
import breakpoint from 'styled-components-breakpoint';

export const CARD_MODIFIERS = {
    categoryCard: () => `
        i {
            background-color: ${pink[200]};
            height: 50px;
            width: 50px;
            &::before {
                display: none;
                font-family: "Font Awesome 5 Pro";
                content: "\f086";
            }
            svg {
                font-size: 30px;
                color: ${light["white"]};
            }
        }
        .card--container {
            display: flex;
            flex-direction: row;
            &::after {
                content: url(${arrowRight});
                align-self: center;
                margin-left: auto;
            }
        }
        .card--content {
            margin-right: 10px;
        }
    `,
    serviceCard: () => `
        h1, h2, h3, h4 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        p {
            font-size: 16px;
        }
        .service--distance {
            margin-top: 15px;
            color: ${dark["black"]};
        }
        img {
            width: 100%;
            height: auto;
        }
    `
}

export const Card = styled.div`
    background: ${light["grey"]};
    border: 1px solid ${light["greyBorder"]};
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    margin-bottom: 10px;
    cursor: pointer;

    .card--container {
        padding: 15px 10px;
    }
    h1, h2, h3, h4 {
        margin-top: 0;
        font-weight: normal;
        font-size: 19px;
        margin-bottom: 5px;
        font-size: 19px;
    }
    p {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 14px;
        color: ${dark["grey"]}
    }

    ${applyStyleModifiers(CARD_MODIFIERS)};
`;