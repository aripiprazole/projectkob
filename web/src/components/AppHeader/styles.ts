import styled from "styled-components";

import { Button } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

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
    flex-wrap: wrap;
    padding-top: 8px;
  }

  > ul > li {
    height: 38px;
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
