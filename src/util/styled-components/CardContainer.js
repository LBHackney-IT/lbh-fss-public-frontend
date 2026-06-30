import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { light } from "../../settings";

export const CardContainer = styled.div`
  padding: 0 15px 0;
  ${breakpoint("md")`
        padding: 10px 15px 20px;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        position: relative;
        z-index: 1;
        background: ${light["white"]};
    `}
`;
