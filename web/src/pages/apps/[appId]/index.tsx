import React, { Suspense } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";

import { Button, TextField } from "@material-ui/core";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { MdPublish } from "react-icons/md";

import { Deploy } from "~/entities/app-status";

import { authorized } from "~/utils";

import { appState, appIsStartedState, appStatusState } from "~/store/apps";

import { Layout, Loading, AppHeader } from "~/components";

import { Container, Fieldset } from "./styles";

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
  const isStarted = useRecoilValue(appIsStartedState);
  const setStatus = useSetRecoilState(appStatusState);

  const { id, name, repo } = useRecoilValue(appState(appId));

  return (
    <Container>
      <h3>{name}'s info</h3>

      <form onSubmit={(event) => event.preventDefault()} className="info">
        <TextField
          disabled
          label="Id"
          size="small"
          variant="outlined"
          value={id}
        />

        <TextField
          disabled
          label="Name"
          size="small"
          variant="outlined"
          value={name}
        />

        <Fieldset>
          <TextField
            disabled
            label="Repo"
            size="small"
            variant="outlined"
            value={repo}
          />

          <Suspense fallback={<div>LOADING </div>}>
            <Button disabled={isStarted} onClick={() => setStatus(Deploy())}>
              <MdPublish size={16} />
              Deploy
            </Button>
          </Suspense>
        </Fieldset>
      </form>
    </Container>
  );
};

export default authorized(Page);
