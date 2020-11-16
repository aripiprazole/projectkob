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

  success?: boolean;
  successContent?: ReactElement;
  successColor?: string;

  error?: boolean;
  errorContent?: ReactElement;
  errorColor?: string;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  progressSize = 24,

  success,
  successContent,
  successColor,

  error,
  errorContent,
  errorColor,

  children,
  ...props
}) => {
  const content = (
    <Container>
      <StyledButton disabled={loading} {...props}>
        <AppThemeProvider>
          {success ? successContent : error ? errorContent : children}
        </AppThemeProvider>
      </StyledButton>

      {loading && (
        <ButtonProgress>
          <CircularProgress size={progressSize} />
        </ButtonProgress>
      )}
    </Container>
  );

  if (loading) return content;

  if (success && successColor) {
    return <PrimaryColor primaryColor={successColor}>{content}</PrimaryColor>;
  }

  if (error && errorColor) {
    return <PrimaryColor primaryColor={errorColor}>{content}</PrimaryColor>;
  }

  return content;
};

type PrimaryColorProps = {
  primaryColor: string;
};

const PrimaryColor: React.FC<PrimaryColorProps> = ({
  primaryColor,
  children,
}) => {
  const theme = useRecoilValue(themeState);

  return (
    <MuiThemeProvider
      theme={{
        ...theme,
        palette: {
          ...theme.palette,
          primary: {
            main: primaryColor,
          },
        },
      }}
    >
      {children}
    </MuiThemeProvider>
  );
};

export default LoadingButton;
