import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint';

export const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 20px;
    ${breakpoint('md')`
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        margin-top: 0;
    `}
`;