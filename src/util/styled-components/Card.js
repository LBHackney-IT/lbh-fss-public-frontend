// import React from 'react';
import styled from "styled-components";
import { applyStyleModifiers } from 'styled-components-modifiers';
import { pink } from "../../settings/colors";
import arrowRight from "../../assets/arrow-right.svg";
import breakpoint from 'styled-components-breakpoint';

export const CARD_MODIFIERS = {
    categoryCard: () => `
        [data-category-icon="loneliness-or-isolation"] {
            i {
                background-color: #DF1995;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="anxiety-or-mental-health"] {
            i {
                background-color: #FF6A13;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="safe-and-healthy-body"] {
            i {
                background-color: #84BD00;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="exercise-and-wellbeing"] {
            i {
                background-color: #E03C31;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="arts-and-creativity"] {
            i {
                background-color: #025EA6;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="food-or-shopping"] {
            i {
                background-color: #328472;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="faith-led-activities"] {
            i {
                background-color: #0085CA;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="money-advice"] {
            i {
                background-color: #81312F;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="employment-advice"] {
            i {
                background-color: #8031A7;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="housing-advice"] {
            i {
                background-color: #2B8CC4;
                &::before {
                    content: "\f007";
                }
            }
        }
        [data-category-icon="immigration-advice"] {
            i {
                background-color: #00664F;
                &::before {
                    content: "\f007";
                }
            }
        }

        i {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${pink[200]};
            height: 50px;
            width: 50px;
            padding: 5px;
            border-radius: 100%;
            margin-right: 10px;
            opacity: 0.75;
            &::before {
                font-family: "Font Awesome 5 Free";
                content: "\f007";
                font-size: 30px;
                color: #fff;
            }
        }
        .hideVisually {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            whiteSpace: nowrap;
            width: 1px;
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
            color: #000;
        }
        img {
            width: 100%;
            height: auto;
        }
    `
}

export const Card = styled.div`
    background: #F8F8F8;
    border: 1px solid #DEE0E2;
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
        color: #525A5B;
    }

    ${applyStyleModifiers(CARD_MODIFIERS)};
`;