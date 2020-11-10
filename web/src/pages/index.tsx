import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import { NextPage } from "next";

import { useRecoilValue } from "recoil";

import { loggedUserState } from "~/store/auth";

import { Layout } from "~/components";

import { Container } from "./styles";

const Home: NextPage = () => {
  return (
    <Layout header={<h1>Home</h1>}>
      <Suspense fallback="Loading...">
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

export default Home;
