import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormError from "../FormError/FormError";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
  label {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

const StyledLabel = styled.label`
  width: 80%;
  display: block;
  font-weight: normal;
  font-size: 19px;
  margin-left: 10px;
`;

const StyledCheckbox = styled.input`
  width: 20%;
  display: block;
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

const FormCheckbox = ({
  name,
  label,
  register,
  required,
  error,
  value,
  onClick = () => {},
  taxonomyId,
}) => {
  return (
    <>
      <StyledDiv>
        <StyledCheckbox
          name={name}
          type="checkbox"
          ref={register({ required })}
          aria-invalid={error ? "true" : "false"}
          value={value}
          onClick={onClick}
          data-taxonomy-id={taxonomyId}
        />
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
      </StyledDiv>
      {error && error.type === "required" && (
        <FormError error="This is required" />
      )}
    </>
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string,
};

export default FormCheckbox;
