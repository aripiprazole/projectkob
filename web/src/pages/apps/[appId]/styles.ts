import styled from "styled-components";

import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialActionProps,
} from "@material-ui/lab";

import { ShrinkContainer } from "~/styles/components";
import { green } from "@material-ui/core/colors";

export const Container = styled(ShrinkContainer)`
  position: relative;

  > h3 {
    margin: 24px 0;
  }

  > .info {
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 100%;
    max-width: 500px;
  }
`;

export const Fieldset = styled.fieldset`
  display: flex;
  gap: 12px;

  border: none;

  width: 100%;

  > .MuiTextField-root {
    flex: 1;
  }
`;

export const StyledSpeedDial = styled(SpeedDial)`
  width: fit-content;
  position: absolute;
  bottom: 0;
  right: 0;
`;
