import React from "react";
import styled from "styled-components";

const StyledError = styled.span`
  display: block;
  margin-bottom: 20px;
`;

const FormError = ({ error }) => {
  return <StyledError role="alert">{error}</StyledError>;
};

export default FormError;
