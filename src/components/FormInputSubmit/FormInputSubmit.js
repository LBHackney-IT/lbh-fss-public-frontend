import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";
import Button from "../Button/Button";
import { darken } from "polished";
import {StyledInput} from "../../util/styled-components/StyledInput";
import {StyledLabel} from "../../util/styled-components/StyledLabel";
import {green} from "../../settings";

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  background: ${green["bright"]};
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 2px;
  padding: 10px;
  width: 40px;
  height: 40px;
  margin: 0;
  &:hover {
    background-color: ${darken(0.1, green["bright"])};
  }

  &::before {
    display: none;
    font-family: "Font Awesome 5 Pro";
    font-weight: 900;
    content: "\f002";
  }
  svg {
    color: #000;
  }

  span {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    whiteSpace: nowrap;
    width: 1px;
  }
`;

const StyledHelp = styled.p``;

const FormInputSubmit = ({
  type,
  name,
  label,
  placeholder,
  register,
  required,
  maxLength,
  minLength,
  error,
  inputRef,
  validate,
  help,
}) => {
  return (
    <>
      {error && error.type === "required" && (
        <FormError error={`${label} is required.`} />
      )}
      {error && error.type === "maxLength" && (
        <FormError error="Max length exceeded." />
      )}
      {error && error.type === "minLength" && (
        <FormError
          error={`${label} must be at least ${minLength} ${
            type === "number" ? "digits" : "characters"
          }.`}
        />
      )}
      {error && error.message && <FormError error={error.message} />}
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {help ? <StyledHelp>{help}</StyledHelp> : ""}
      <StyledInputContainer>
        <StyledInput
          aria-label={name}
          name={name}
          placeholder={placeholder}
          type={type}
          ref={(e) => {
            register(e, { required, minLength, maxLength, validate });
            if (inputRef) inputRef.current = e;
          }}
          aria-invalid={error ? "true" : "false"}
        />
        {/* <StyledButton type="submit" label="Login" disabled={isLoading} /> */}
        <StyledButton type="submit" label="Submit" />
      </StyledInputContainer>
    </>
  );
};

FormInputSubmit.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  error: PropTypes.object,
};

export default FormInputSubmit;
