import styled from "styled-components";

import { darken } from "@material-ui/core";
import AppTheme from "~/styles/theme";

const darkenPrimary = (theme: AppTheme) =>
  darken(theme.palette.primary.main, 0.5);

export const Container = styled.aside`
  background: ${(props) => props.theme.palette.primary.main};
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

  border-bottom: 1px solid ${(props) => darkenPrimary(props.theme)};
`;

export const Nav = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export type ItemProps = {
  selected?: boolean;
};

export const Item = styled.div<ItemProps>`
  > a {
    display: flex;
    flex-direction: column;

    padding: 12px;
    margin: 16px;

    /* background: #562ad1; */
    background: ${(props) => props.theme.palette.primary.main};

    font-weight: bold;

    text-transform: uppercase;
    text-decoration: none;
    text-align: center;

    border-radius: 12px;
    border: 1px solid
      ${(props) =>
        props.selected ? darkenPrimary(props.theme) : "transparent"};

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

    border: 1px solid ${(props) => darkenPrimary(props.theme)};
  }
`;
