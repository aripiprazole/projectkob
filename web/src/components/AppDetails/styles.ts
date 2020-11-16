import styled from "styled-components";

import { Skeleton, SpeedDial } from "@material-ui/lab";

import { ShrinkContainer } from "~/styles/components";

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
  align-items: center;
  gap: 12px;

  border: none;

  width: 100%;

  > .MuiTextField-root {
    flex: 1;
  }
`;

export const StyledSpeedDial = styled(SpeedDial)`
  width: fit-content;
  position: fixed;
  right: 32px;
  bottom: 32px;
`;

export const LoadingSpeedDial = styled(Skeleton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
