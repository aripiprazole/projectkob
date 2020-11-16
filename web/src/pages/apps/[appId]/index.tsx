import React, { Suspense, useState } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";

import { Button, TextField } from "@material-ui/core";

import {
  SpeedDialAction,
  SpeedDialActionProps,
  SpeedDialIcon,
} from "@material-ui/lab";

import {
  useRecoilCallback,
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { MdClose, MdDelete, MdEdit, MdPublish } from "react-icons/md";

import { Deploy } from "~/entities/app-status";

import { authorized } from "~/utils";

import { appsServiceState } from "~/services";

import {
  appState,
  appIsStartedState,
  appStatusState,
  appListState,
} from "~/store/apps";

import {
  Layout,
  Loading,
  AppHeader,
  LoadingButton,
  LoadingIcon,
} from "~/components";

import { Container, Fieldset, StyledSpeedDial } from "./styles";

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
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const { id, name, repository: repo } = useRecoilValue(appState(appId));

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
          <Suspense
            fallback={
              <LoadingButton loading>
                <MdPublish size={16} />
                Deploy
              </LoadingButton>
            }
          >
            <DeployButton />
          </Suspense>
        </Fieldset>
      </form>

      <StyledSpeedDial
        ariaLabel="App actions"
        icon={
          <SpeedDialIcon
            icon={<MdEdit size={24} />}
            openIcon={<MdClose size={24} />}
          />
        }
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        open={speedDialOpen}
      >
        <DeleteAction appId={id} />
      </StyledSpeedDial>
    </Container>
  );
};

type DeleteActionProps = SpeedDialActionProps & {
  appId: string;
};

const DeleteAction: React.VFC<DeleteActionProps> = ({ appId, ...props }) => {
  const [loading, setLoading] = useState(false);

  const appsService = useRecoilValue(appsServiceState);
  const router = useRouter();

  const [appList, setAppList] = useRecoilStateLoadable(appListState);

  const deleteApp = useRecoilCallback(() => async () => {
    if (loading) return;

    setLoading(true);

    appsService.deleteAppById(appId);

    setAppList((apps) => apps.filter((app) => app.id !== appId));
    setLoading(false);

    router.push("/apps");
  });

  return (
    <SpeedDialAction
      {...props}
      tooltipTitle="Delete"
      icon={
        <LoadingIcon loading={loading || appList.state === "loading"}>
          <MdDelete size={20} />
        </LoadingIcon>
      }
      tooltipOpen
      onClick={appList.state === "hasValue" ? deleteApp : undefined}
    />
  );
};

const DeployButton: React.VFC = () => {
  const isStarted = useRecoilValue(appIsStartedState);
  const setStatus = useSetRecoilState(appStatusState);

  return (
    <Button disabled={isStarted} onClick={() => setStatus(Deploy())}>
      <MdPublish size={16} />
      Deploy
    </Button>
  );
};

export default authorized(Page);
