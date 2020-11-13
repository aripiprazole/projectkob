import React, { Suspense } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { None } from "~/entities/app-status";

import { appState, appStatusState } from "~/store/apps";

import { Layout, Loading, AppHeader } from "~/components";

import {
  Container,
  InfoField,
  InfoLabel,
  FieldContainer,
  Action,
} from "./styles";

const Page: NextPage = () => {
  const { appId = "" } = useRouter().query;

  return (
    <Layout
      header={
        <Suspense fallback={<AppHeaderLoading />}>
          <AppHeader appId={appId.toString()} />
        </Suspense>
      }
    >
      <Suspense fallback={<AppDetailsLoading />}>
        <AppDetails appId={appId.toString()} />
      </Suspense>
    </Layout>
  );
};

const AppHeaderLoading: React.VFC = () => <Loading />;
const AppDetailsLoading: React.VFC = () => <Loading />;

type Props = {
  appId: string;
};

const AppDetails: React.VFC<Props> = ({ appId }) => {
  const setStatus = useSetRecoilState(appStatusState);

  const { id, name, repo } = useRecoilValue(appState(appId));

  return (
    <Container onSubmit={(event) => event.preventDefault()}>
      <h3>{name}'s info</h3>

      <ul>
        <FieldContainer>
          <InfoLabel htmlFor="id">Id</InfoLabel>
          <InfoField disabled value={id} id="id" />
        </FieldContainer>

        <FieldContainer>
          <InfoLabel htmlFor="name">Name</InfoLabel>
          <InfoField disabled value={name} id="name" />
        </FieldContainer>

        <FieldContainer>
          <InfoLabel htmlFor="repo">Repo</InfoLabel>
          <InfoField disabled value={repo} id="repo" />
        </FieldContainer>

        <FieldContainer>
          <Action onClick={() => setStatus(None)}>Deploy</Action>
        </FieldContainer>
      </ul>
    </Container>
  );
};

export default Page;
