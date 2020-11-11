import styled from "styled-components";

type ContainerProps = {
  size: number;
};

export const Container = styled.div<ContainerProps>`
  min-height: ${(props) => props.size}px;
  width: 100%;

  overflow: hidden;

  position: relative;
`;

export const LoadingBar = styled.span`
  display: block;

  width: 100%;
  height: 100%;

  background: #000;
  opacity: 0.1;

  overflow: hidden;

  position: absolute;

  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  @keyframes bar-animation {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }

  animation: 1.2s bar-animation ease-in-out infinite;
`;
