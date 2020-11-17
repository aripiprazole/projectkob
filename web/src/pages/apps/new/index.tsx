import React, { Suspense, useCallback, useState } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";

import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";

import { CircularProgress, MenuItem, TextField } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

import { FiGithub } from "react-icons/fi";
import { MdArrowBack, MdError, MdLock } from "react-icons/md";

import { loggedUserReposState } from "~/store/session";
import { appListLastPageState, appListState } from "~/store/apps";

import { App } from "~/entities";
import { appsServiceState } from "~/services";

import { Layout, LoadingButton, PrimaryColor } from "~/components";

import { Container, RepoItem, ButtonContent, ProgressWrapper } from "./styles";

const Page: NextPage = () => {
  const defaultAppName = generateAppName();

  return (
    <Layout header={<h1>Creating app</h1>}>
      <Container>
        <Suspense
          fallback={
            <form onSubmit={(event) => event.preventDefault()}>
              <TextField
                variant="outlined"
                label="App name"
                color="primary"
                value={defaultAppName}
              />

              <TextField
                select
                label="Repository"
                variant="outlined"
                color="primary"
              >
                <ProgressWrapper>
                  <CircularProgress />
                </ProgressWrapper>
              </TextField>

              <LoadingButton
                loading={true}
                color={"primary"}
                variant="outlined"
                size="large"
              >
                Create
              </LoadingButton>
            </form>
          }
        >
          <Content defaultAppName={defaultAppName} />
        </Suspense>
      </Container>
    </Layout>
  );
};

type Props = {
  defaultAppName: string;
};

const Content: React.VFC<Props> = ({ defaultAppName }) => {
  const lastPage = useRecoilValue(appListLastPageState);

  const [_, setAppList] = useRecoilState(appListState(lastPage));

  const [appName, setAppName] = useState(defaultAppName);
  const [appRepository, setAppRepository] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);
  const [app, setApp] = useState<App>();

  const router = useRouter();
  const appsService = useRecoilValue(appsServiceState);

  const repos = useRecoilValue(loggedUserReposState);

  const createNewApp = useRecoilCallback(() => async () => {
    if (loading) return;

    setLoading(true);

    try {
      const newApp = await appsService.createNewApp({
        name: appName,
        repository: appRepository,
      });

      setAppList((apps) => apps.append(newApp));

      setApp(newApp);
      setSuccess(true);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  });

  const backToApps = useCallback(() => {
    router.push(`/apps/${app?.id}`);
  }, [router, app]);

  const onSubmit = success ? backToApps : createNewApp;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit();
      }}
    >
      <TextField
        variant="outlined"
        label="App name"
        color="primary"
        value={appName}
        onChange={(event) => setAppName(event.target.value)}
      />

      <TextField
        select
        variant="outlined"
        label="Repository"
        color="primary"
        value={appRepository}
        onChange={(event) => setAppRepository(event.target.value)}
      >
        {repos.map((repo) => (
          <MenuItem key={repo.name} value={repo.name}>
            <RepoItem>
              <FiGithub />

              <span className="name">{repo.name}</span>

              {repo.isPrivate && <MdLock />}
            </RepoItem>
          </MenuItem>
        ))}
      </TextField>

      <PrimaryColor primaryColor={success ? green[500] : error && red[500]}>
        <LoadingButton
          type="submit"
          loading={loading}
          color={"primary"}
          variant="outlined"
          size="large"
        >
          {success ? (
            <ButtonContent>
              <MdArrowBack size={22} />

              <div className="text">Access app</div>
            </ButtonContent>
          ) : error ? (
            <ButtonContent>
              <MdError size={22} />

              <div className="text">Retry</div>
            </ButtonContent>
          ) : (
            "Create"
          )}
        </LoadingButton>
      </PrimaryColor>
    </form>
  );
};

function generateAppName(): string {
  const randomNumber = Math.round(Math.random() * 10000);

  return `My new project ${randomNumber}`;
}

export default Page;
