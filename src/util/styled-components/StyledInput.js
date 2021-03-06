import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint';
import { red } from "../../settings";

export const StyledInput = styled.input`
    display: block;
    margin-bottom: 15px;
    width: 100%;
    height: 50px;
    border: 0;
    padding: 15px;
    border-radius: 3px;
    ${breakpoint('md')`
        max-width: 438px;

    `}
    &[aria-invalid="true"] {
        border-color: ${red["error"]} !important;
    }
`;