import styled from "styled-components";

export const Container = styled.aside`
  background: #562ad1;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const Logo = styled.span`
  padding: 48px 28px;

  margin: 0 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-bottom: 1px solid #3b1d8f;
`;

export const Nav = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const Items = styled.ul``;

export type ItemProps = {
  selected?: boolean;
};

export const Item = styled.div<ItemProps>`
  > a {
    display: flex;
    flex-direction: column;

    padding: 12px;
    margin: 16px;

    background: #562ad1;

    font-weight: bold;

    text-transform: uppercase;
    text-decoration: none;
    text-align: center;

    border-radius: 12px;
    border: 1px solid ${(props) => (props.selected ? "#3b1d8f" : "transparent")};

    filter: brightness(${(props) => (props.selected ? "80%" : "100%")});

    transition: border 150ms ease-in;
  }

  > a > svg {
    margin: auto;
  }

  > a > span {
    margin: 6px;
    color: #eee;
  }

  > a:hover {
    filter: brightness(80%);

    border: 1px solid #3b1d8f;
  }
`;
