import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";
import Button from "../Button/Button";
import { darken } from "polished";
import {StyledInput} from "../../util/styled-components/StyledInput";
import {StyledLabel} from "../../util/styled-components/StyledLabel";
import {green} from "../../settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    white-space: nowrap;
    width: 1px;
  }
`;

const StyledHelp = styled.p``;

const FormInputSubmit = ({
  id,
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
  // inputRef,
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
          id={id}
          aria-label={name}
          name={name}
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
          aria-invalid={error ? "true" : "false"}
          {...register(name, { required, minLength, maxLength, validate })}
        />
        {/* <StyledButton type="submit" label="Login" disabled={isLoading} /> */}
        <StyledButton type="submit" label="Submit" >
          <FontAwesomeIcon icon={["fas", "search"]} />
        </StyledButton>
      </StyledInputContainer>
    </>
  );
};

FormInputSubmit.propTypes = {
  id: PropTypes.string,
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

export default FormInputSubmit;
