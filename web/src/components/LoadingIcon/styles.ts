import styled from "styled-components";

type ContainerProps = {
  disabled: boolean;
  success: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex: 1;

  > .content {
    min-width: 15px;
    min-height: 15px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    filter: brightness(${(props) => (props.disabled ? 80 : 100)}%);
  }
`;

export const FabProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
