import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: fit-content(128px) 1fr;
  height: 100%;

  > div {
    overflow-y: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainWrapper = styled.div`
  padding: 24px;
  height: 100%;
  width: 100%;
`;

export const Header = styled.header`
  min-height: 72px;
  padding: 24px;

  border-bottom: 1px solid #d9d9d9;

  min-height: fit-content;

  > .content {
    max-width: ${(props) => props.theme.breakpoints.width("lg")}px;
    width: 100%;
    min-height: max-content;
    height: 100%;
    margin: 0 auto;
  }
`;
