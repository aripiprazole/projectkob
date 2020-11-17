import React, { Suspense, useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { useRecoilState, useRecoilValue } from "recoil";

import { guest } from "~/utils";

import { authenticationTokenState, loggedUserState } from "~/store/session";

import { Container } from "./styles";
import { CircularProgress } from "@material-ui/core";

const Page: NextPage = () => {
  return (
    <Suspense
      fallback={
        <Container>
          <CircularProgress />
        </Container>
      }
    >
      <Content />
    </Suspense>
  );
};

const Content: React.VFC = () => {
  const router = useRouter();

  const [token, setToken] = useRecoilState(authenticationTokenState);

  useEffect(() => {
    const code = router.query.code?.toString();
    if (!code) return;

    setToken(code);
  }, [router]);

  useEffect(() => {
    if (!token) return;

    router.push("/");
  }, [router, token]);

  return (
    <Container>
      <CircularProgress color="secondary" />
    </Container>
  );
};

export default guest(Page);
