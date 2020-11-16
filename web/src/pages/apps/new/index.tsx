import React, { Suspense, useState } from "react";

import { NextPage } from "next";

import { useRecoilCallback, useRecoilValue } from "recoil";

import { MenuItem, TextField } from "@material-ui/core";

import { FiGithub } from "react-icons/fi";
import { MdLock } from "react-icons/md";

import { loggedUserReposState } from "~/store/auth";
import { appListState } from "~/store/apps";

import { appsServiceState } from "~/services";

import { Layout, Loading, LoadingButton } from "~/components";

import { Container, RepoItem } from "./styles";

const Page: NextPage = () => {
  const [appName, setAppName] = useState(generateAppName());
  const [appRepo, setAppRepo] = useState("");

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const appsService = useRecoilValue(appsServiceState);

  const createNewApp = useRecoilCallback(({ set }) => async () => {
    setLoading(true);
    try {
      const newApp = await appsService.createNewApp({
        name: appName,
        repository: appRepo,
      });

      set(appListState, (apps) => [...apps, newApp]);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  });

  return (
    <Layout header={<h1>Creating app</h1>}>
      <Container>
        <form>
          <TextField
            variant="outlined"
            label="App name"
            color="primary"
            value={appName}
            onChange={(event) => setAppName(event.target.value)}
          />

          <Suspense
            fallback={
              <TextField
                select
                label="Repository"
                variant="outlined"
                color="primary"
              >
                <Loading />
              </TextField>
            }
          >
            <RepoField appRepo={appRepo} setAppRepo={setAppRepo} />
          </Suspense>

          <LoadingButton
            loading={loading}
            onClick={createNewApp}
            color="primary"
            variant="outlined"
            size="large"
          >
            Create
          </LoadingButton>
        </form>
      </Container>
    </Layout>
  );
};

type Props = {
  appRepo: string;
  setAppRepo: (repo: string) => void;
};

const RepoField: React.VFC<Props> = ({ appRepo, setAppRepo }) => {
  const loggedUserRepos = useRecoilValue(loggedUserReposState);

  return (
    <TextField
      select
      variant="outlined"
      label="Repository"
      color="primary"
      value={appRepo}
      onChange={(event) => {
        console.log("event", event);
        console.log("value", event.target.value);

        setAppRepo(event.target.value);
      }}
    >
      {loggedUserRepos.map((repo) => (
        <MenuItem key={repo.id} value={repo.name}>
          <RepoItem>
            <FiGithub />

            <span className="name">{repo.name}</span>

            {repo.isPrivate && <MdLock />}
          </RepoItem>
        </MenuItem>
      ))}
    </TextField>
  );
};

function generateAppName(): string {
  const randomNumber = Math.round(Math.random() * 10000);

  return `My new project ${randomNumber}`;
}

export default Page;
