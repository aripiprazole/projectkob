import React, { Suspense } from "react";

import { NextPage } from "next";

import { useRecoilValue } from "recoil";

import { CircularProgress } from "@material-ui/core";

import { authorized } from "~/utils";

import { loggedUserState } from "~/store/session";

import { Layout } from "~/components";

import { Container, LoadingWrapper } from "./styles";

const Page: NextPage = () => {
  return (
    <Layout selected="home" header={<h1>Home</h1>}>
      <Suspense
        fallback={
          <LoadingWrapper>
            <CircularProgress size={48} />
          </LoadingWrapper>
        }
      >
        <Content />
      </Suspense>
    </Layout>
  );
};

const Content: React.VFC = () => {
  const user = useRecoilValue(loggedUserState);

  return (
    <Container>
      <p>
        Welcome {user?.username}, to projectkob home, here you can deploy your
        apps safe!
      </p>
    </Container>
  );
};

export default authorized(Page);
