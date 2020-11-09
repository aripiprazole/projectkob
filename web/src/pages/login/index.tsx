import React, { useContext } from "react";

import { useRouter } from "next/router";

import { AuthService } from "~/services";

import { Container, LoginButton } from "./styles";

const LoginPage: React.VFC = () => {
  const router = useRouter();
  const authService = useContext(AuthService.Context);

  return (
    <Container>
      <LoginButton onClick={() => router.push(authService.authenticationLink)}>
        Login with Github
      </LoginButton>
    </Container>
  );
};

export default LoginPage;
