import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import FormInputSubmit from "./FormInputSubmit";

jest.mock("styled-components-breakpoint", () => () => () => "");
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-search">search</span>,
}));

const TestWrapper = ({ children }) => {
  const { register } = useForm();
  return children(register);
};

describe("FormInputSubmit", () => {
  it("renders label, input and submit button", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInputSubmit
            name="service_search"
            label="Search for a service"
            placeholder="Enter keyword"
            register={register}
            type="text"
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByLabelText("service_search")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter keyword")).toBeInTheDocument();
    const submitButton = screen.getByRole("button", { type: "submit" });
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByTestId("fa-search")).toBeInTheDocument();
  });

  it("shows required error when error type is required", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInputSubmit
            name="q"
            label="Search"
            register={register}
            type="text"
            error={{ type: "required" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Search is required.");
  });

  it("shows max length error when error type is maxLength", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInputSubmit name="q" label="Search" register={register} type="text" error={{ type: "maxLength" }} />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Max length exceeded.");
  });

  it("shows min length error with characters for non-number type", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInputSubmit
            name="q"
            label="Search"
            register={register}
            type="text"
            minLength={3}
            error={{ type: "minLength" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Search must be at least 3 characters.");
  });

  it("shows custom error message when error.message is set", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInputSubmit
            name="q"
            label="Search"
            register={register}
            type="text"
            error={{ message: "Invalid search" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid search");
  });

  it("sets aria-invalid on input when error is present", () => {
    render(
      <TestWrapper>
        {(register) => (
          <FormInputSubmit
            name="q"
            label="Search"
            register={register}
            type="text"
            error={{ type: "required" }}
          />
        )}
      </TestWrapper>,
    );
    expect(screen.getByLabelText("q")).toHaveAttribute("aria-invalid", "true");
  });
});
