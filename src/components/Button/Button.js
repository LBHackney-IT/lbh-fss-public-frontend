import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { neutral, green } from "../../settings";
import { darken } from "polished";

const StyledButton = styled.button`
  display: block;
  margin-bottom: 30px;
  color: ${neutral[100]};
  background-color: ${green[400]};
  border: none;
  padding: 13px 57px;
  font-size: 19px;
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.1, green[400])};
  }
`;

const Button = ({ type, label, disabled, onClick = () => {}, className }) => {
  return (
    <>
      <StyledButton
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        <span>{label}</span>
      </StyledButton>
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
