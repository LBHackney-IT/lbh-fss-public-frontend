import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";
import {StyledInput} from "../../util/styled-components/StyledInput";

const StyledLabel = styled.label`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    whiteSpace: nowrap;
    width: 1px;
`;

const StyledHelp = styled.p``;

const FormInput = ({
  type,
  name,
  label,
  placeholder,
  register,
  defaultValue,
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
      <StyledInput
        aria-label={name}
        name={name}
        placeholder={placeholder}
        type={type}
        ref={(e) => {
          register(e, { required, minLength, maxLength, validate });
          if (inputRef) inputRef.current = e;
        }}
        defaultValue={defaultValue}
        aria-invalid={error ? "true" : "false"}
      />
    </>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  error: PropTypes.object,
};

export default FormInput;
