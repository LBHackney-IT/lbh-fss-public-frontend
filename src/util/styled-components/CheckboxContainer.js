import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

export const CheckboxContainer = styled.div`
  padding: 0 15px 0;
  ${breakpoint("md")`
        padding: 0 15px;
        overflow-y: auto;
        flex: 1;
        min-height: 0;
    `}
`;
