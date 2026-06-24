import styled, { keyframes } from "styled-components";
import { green } from "./settings";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingRoot = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 240px;
  padding: 40px 20px;
  text-align: center;
  width: 100%;
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

const AppLoading = () => {
  return (
    <LoadingRoot role="status" aria-live="polite">
      <Spinner aria-hidden="true" />
      <LoadingText>Loading</LoadingText>
    </LoadingRoot>
  );
};

export default AppLoading;
