import React from "react";

import { container } from "tsyringe";

import { Button } from "@material-ui/core";

import { SESSION_SERVICE_KEY } from "services/SessionService";

import { Container } from "./styles";

const LoginPage: React.VFC = () => {
  const { loginUrl } = container.resolve(SESSION_SERVICE_KEY);

  return (
    <Container>
      <div>
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={() => window.location.assign(loginUrl)}
        >
          Login with github
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
