import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Container } from "./styles";
import { Button } from "@material-ui/core";

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="wrapper">
        <Button
          color="primary"
          variant="contained"
          onClick={() => router.push("authenticationLink")}
        >
          Login with Github
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
