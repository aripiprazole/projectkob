import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  display: flex;
  align-items: center;

  background: #9627d6;

  min-height: 196px;
  padding-left: 48px;

  border-bottom: 6px solid #791dad;

  > h2 {
    color: #eee;
    width: 100%;
    max-width: 1200px;
    margin: auto;
  }
`;

export const Apps = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 24px;

  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

export const AppItem = styled.li``;

export const AppLink = styled.a`
  padding: 12px;

  display: flex;
  align-items: center;

  border: 1px solid #ddd;
  border-radius: 8px;

  cursor: pointer;

  background: #fff;

  transition: filter 150ms ease-in;

  :hover {
    filter: brightness(90%);
  }

  > div {
    margin-left: 12px;
  }

  > div > span {
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
  }

  > svg,
  > svg * {
    color: #333;
  }
`;
