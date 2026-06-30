import styled, { keyframes } from "styled-components";
import { green } from "./settings";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingRoot = styled.div`
  align-items: center;
  background: ${({ $overlay }) =>
    $overlay ? "rgba(255, 255, 255, 0.55)" : "transparent"};
  display: flex;
  flex-direction: column;
  inset: ${({ $overlay }) => ($overlay ? "0" : "auto")};
  justify-content: center;
  min-height: ${({ $overlay }) => ($overlay ? "100%" : "240px")};
  padding: 40px 20px;
  position: ${({ $overlay }) => ($overlay ? "absolute" : "static")};
  text-align: center;
  width: 100%;
  z-index: ${({ $overlay }) => ($overlay ? "20" : "auto")};
`;

const Spinner = styled.div`
  animation: ${spin} 0.8s linear infinite;
  border: 4px solid ${green.light};
  border-radius: 50%;
  border-top-color: ${green.main};
  box-sizing: border-box;
  height: 56px;
  margin-bottom: 12px;
  width: 56px;
`;

const LoadingText = styled.div`
  color: ${green.main};
  font-weight: 700;
`;

const AppLoading = ({ label = "Loading", overlay = false }) => {
  return (
    <LoadingRoot role="status" aria-live="polite" $overlay={overlay}>
      <Spinner aria-hidden="true" />
      <LoadingText>{label}</LoadingText>
    </LoadingRoot>
  );
};

export default AppLoading;
