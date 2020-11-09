import React from "react";

import { useRouter } from "next/router";

import { Container, LoginButton } from "./styles";

const LoginPage: React.VFC = () => {
  const router = useRouter();

  return (
    <Container>
      <LoginButton onClick={() => router.push("authenticationLink")}>
        Login with Github
      </LoginButton>
    </Container>
  );
};

export default LoginPage;
