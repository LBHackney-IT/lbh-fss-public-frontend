import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint';

export const CardContainer = styled.div`
    padding: 30px 15px 0;
    ${breakpoint('md')`
        padding: 30px 15px 260px;
        overflow-y: scroll;
        height: 100vh;
    `}
`;