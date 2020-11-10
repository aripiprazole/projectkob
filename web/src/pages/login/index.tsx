import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Container, LoginButton } from "./styles";

const LoginPage: NextPage = () => {
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
