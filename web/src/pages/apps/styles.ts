import styled from "styled-components";

import { ShrinkContainer } from "~/styles/components";

export const Container = styled(ShrinkContainer)``;

export const Items = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AppLink = styled.a`
  padding: 16px 12px;

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
