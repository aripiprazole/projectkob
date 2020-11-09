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

  > main {
    flex: 1;
  }
`;

export const Header = styled.header`
  padding: 24px;

  border-bottom: 1px solid #d9d9d9;
`;
