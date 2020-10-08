import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint';
import { light } from "../../settings";

export const CardContainer = styled.div`
    padding: 20px 15px 0;
    ${breakpoint('md')`
        padding: 20px 15px 20px;
        overflow-y: scroll;
        height: calc(100vh - 260px);
        position: relative;
        z-index: 1;
        background: ${light["white"]};
    `}
`;