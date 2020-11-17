import React, { ReactElement } from "react";

import { useRecoilValue } from "recoil";

import {
  ButtonProps,
  CircularProgress,
  MuiThemeProvider,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import { AppThemeProvider } from "~/components";

import { themeState } from "~/store/theme";

import { ButtonProgress, Container, StyledButton } from "./styles";

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
  progressSize?: number;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  progressSize = 24,

  children,
  ...props
}) => {
  return (
    <Container>
      <StyledButton disabled={loading} {...props}>
        {children}
      </StyledButton>

      {loading && (
        <ButtonProgress>
          <CircularProgress size={progressSize} />
        </ButtonProgress>
      )}
    </Container>
  );
};

export default LoadingButton;
