import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

jest.mock("styled-components-breakpoint", () => () => () => "");

const TestWrapper = ({ children }) => {
  const { register } = useForm();
  return children(register);
};

describe("FormInput", () => {
  it("renders label and input", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput name="postcode" label="Postcode" register={register} type="text" />
        )}
      </TestWrapper>,
    );
    const input = screen.getByLabelText("postcode");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "postcode");
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders help text when help prop is provided", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput
            name="postcode"
            label="Postcode"
            register={register}
            type="text"
            help="Enter your full postcode"
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByText("Enter your full postcode")).toBeInTheDocument();
  });

  it("shows required error when error type is required", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput
            name="postcode"
            label="Postcode"
            register={register}
            type="text"
            error={{ type: "required" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Postcode is required.");
  });

  it("shows max length error when error type is maxLength", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput
            name="postcode"
            label="Postcode"
            register={register}
            type="text"
            error={{ type: "maxLength" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Max length exceeded.");
  });

  it("shows min length error with characters when type is not number", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput
            name="postcode"
            label="Postcode"
            register={register}
            type="text"
            minLength={5}
            error={{ type: "minLength" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Postcode must be at least 5 characters.",
    );
  });

  it("shows min length error with digits when type is number", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput
            name="phone"
            label="Phone"
            register={register}
            type="number"
            minLength={10}
            error={{ type: "minLength" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Phone must be at least 10 digits.",
    );
  });

  it("shows custom error message when error.message is set", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput
            name="postcode"
            label="Postcode"
            register={register}
            type="text"
            error={{ message: "Invalid postcode format" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid postcode format");
  });

  it("sets aria-invalid on input when error is present", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInput
            name="postcode"
            label="Postcode"
            register={register}
            type="text"
            error={{ type: "required" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByLabelText("postcode")).toHaveAttribute("aria-invalid", "true");
  });
});
