import React from "react";

import { Container, LoadingBar } from "./styles";

type LoadingProps = {
  className?: string;
};

const Loading: React.FC<LoadingProps> = ({ children, className }) => {
  return (
    <Container className={className} size={32}>
      {children}

      <LoadingBar />
    </Container>
  );
};

export default Loading;
