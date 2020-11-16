import styled from "styled-components";

import { Button } from "@material-ui/core";

import { ShrinkContainer } from "~/styles/components";

export const Container = styled(ShrinkContainer)`
  display: flex;
`;

export const ItemsWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const Items = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AppLink = styled.a`
  padding: 20px 12px;

  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;

  border-bottom: 1px solid #ddd;
  border-radius: 8px;

  background: ${(props) => props.theme.palette.background.default};

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

export const CreateAppButton = styled(Button).attrs({
  variant: "contained",
  color: "primary",
})`
  padding: 16px !important;
  border-radius: 50% !important;

  position: absolute !important;
  right: 0;
  bottom: 0;
`;

export const CreateAppLink = styled.a`
  color: ${(props) => props.theme.palette.text.primary};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;
