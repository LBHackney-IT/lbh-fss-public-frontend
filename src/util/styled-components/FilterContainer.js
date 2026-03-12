import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { light } from "../../settings";

export const FilterContainer = styled.div`
  ${breakpoint("md")`
        position: relative;
        z-index: 1;
        background: ${light["white"]};
        height: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
    `}
  h2 {
    margin: 30px 15px 15px !important;
    font-size: 24px;
  }
  form {
    position: relative;
    ${breakpoint("md")`
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    `}
  }
`;
