import styled from "styled-components";

export const Container = styled.div``;

export const AppList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 24px;

  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

export const AppListItem = styled.li``;

export const AppItemLink = styled.a`
  padding: 16px 12px;

  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;

  border-bottom: 1px solid #ddd;
  border-radius: 8px;

  background: #f9f9f9;

  cursor: pointer;

  transition: filter 150ms ease-in;

  :hover {
    filter: brightness(90%);
  }

  > div.icon {
    display: flex;
    justify-content: center;
  }

  > span.name {
    padding: 0 12px;
  }

  > svg,
  > svg * {
    color: #333;
  }
`;
