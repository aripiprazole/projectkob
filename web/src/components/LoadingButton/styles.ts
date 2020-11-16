import styled from "styled-components";

import { Button, CircularProgress } from "@material-ui/core";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
`;

export const StyledButton = styled(Button)``;

export const ButtonProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
