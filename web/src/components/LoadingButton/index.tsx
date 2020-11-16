import React from "react";

import { ButtonProps, CircularProgress } from "@material-ui/core";

import { ButtonProgress, Container, StyledButton } from "./styles";

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
  progressSize?: number;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  progressSize = 24,
  ...props
}) => {
  return (
    <Container>
      <StyledButton disabled={loading} {...props} />

      {loading && (
        <ButtonProgress>
          <CircularProgress size={progressSize} />
        </ButtonProgress>
      )}
    </Container>
  );
};

export default LoadingButton;
