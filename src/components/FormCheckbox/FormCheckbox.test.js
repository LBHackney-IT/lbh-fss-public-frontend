import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import FormCheckbox from "./FormCheckbox";

const TestWrapper = ({ defaultValues = {}, children }) => {
  const { register } = useForm({ defaultValues });
  return children(register);
};

describe("FormCheckbox", () => {
  it("renders label and checkbox", () => {
    render(
      <TestWrapper>
        {(register) => <FormCheckbox name="agree" label="I agree" register={register} />}
      </TestWrapper>,
    );
    expect(screen.getByText("I agree")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("shows FormError when required and error type is required", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormCheckbox
            name="agree"
            label="I agree"
            register={register}
            required
            error={{ type: "required" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("This is required");
  });

  it("does not show FormError when error is not required type", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormCheckbox
            name="agree"
            label="I agree"
            register={register}
            error={{ type: "pattern" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
