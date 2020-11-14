import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Button } from "@material-ui/core";

import { guest } from "~/utils";

import { AUTHENTICATION_LINK } from "~/config";

import { Container } from "./styles";

const Page: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="wrapper">
        <Button
          color="primary"
          variant="contained"
          onClick={() => router.push(AUTHENTICATION_LINK)}
        >
          Login with Github
        </Button>
      </div>
    </Container>
  );
};

export default guest(Page);
