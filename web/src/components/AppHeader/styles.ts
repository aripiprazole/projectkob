import { Button } from "@material-ui/core";
import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 1000px;
  margin: auto;

  > h1 {
    display: flex;
    align-items: center;
  }

  > h1 > span {
    margin-left: 8px;
  }

  > ul {
    display: flex;
    gap: 12px;
  }
`;

export const ActionButton = styled(Button).attrs({
  variant: "outlined",
})`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  > .MuiButton-label .text {
    text-transform: uppercase;
    font-weight: bold;

    margin: 0 8px;
  }
`;
