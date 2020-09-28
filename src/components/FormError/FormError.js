import React from "react";
import styled from "styled-components";
import { light } from "../../settings";

const StyledError = styled.span`
  display: block;
  margin-bottom: 20px;
  color: ${light["white"]};
`;

const FormError = ({ error }) => {
  return <StyledError role="alert">{error}</StyledError>;
};

export default FormError;
