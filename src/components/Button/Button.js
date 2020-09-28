import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { light, green } from "../../settings";
import { darken } from "polished";

const StyledButton = styled.button`
  display: block;
  margin-bottom: 30px;
  color: ${light["white"]};
  background-color: ${green["main"]};
  border: none;
  padding: 13px 57px;
  font-size: 19px;
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.1, green["main"])};
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
