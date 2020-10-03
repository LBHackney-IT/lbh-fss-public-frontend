import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint';

export const CardContainer = styled.div`
    padding: 20px 15px 0;
    ${breakpoint('md')`
        padding: 20px 15px 20px;
        overflow-y: scroll;
        height: calc(100vh - 260px);
    `}
`;