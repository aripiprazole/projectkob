import React, { Suspense } from "react";

import Link from "next/link";

import { useRecoilValue } from "recoil";

import { CircularProgress } from "@material-ui/core";

import { MdPower, MdNote } from "react-icons/md";

import AppStatus from "~/entities/app-status";

import { appState, appStatusState } from "~/store/apps";

import { Container, ActionButton } from "./styles";

import {
  ActionButtonLoading,
  KillButton,
  StartButton,
  StopButton,
} from "./actions";

const START_COLOR = "#15ed44";
const STOP_COLOR = "#e36319";
const KILL_COLOR = "#f0164c";

type Props = {
  appId: string;
};

const AppHeader: React.VFC<Props> = ({ appId }) => {
  const { name } = useRecoilValue(appState(appId));

  return (
    <Container>
      <h1>
        {name}

        <span>
          <Suspense fallback={<CircularProgress size={16} />}>
            <AppStatusBadge />
          </Suspense>
        </span>
      </h1>

      <ul>
        <li>
          <Link href="/apps/[appId]/logs" as={`/apps/${appId}/logs`}>
            <ActionButton color="secondary">
              <MdNote size={16} />

              <span className="text">Logs</span>
            </ActionButton>
          </Link>
        </li>

        <li>
          <Suspense fallback={<ActionButtonLoading>Start</ActionButtonLoading>}>
            <StartButton />
          </Suspense>
        </li>

        <li>
          <Suspense fallback={<ActionButtonLoading>Stop</ActionButtonLoading>}>
            <StopButton />
          </Suspense>
        </li>

        <li>
          <Suspense fallback={<ActionButtonLoading>Kill</ActionButtonLoading>}>
            <KillButton />
          </Suspense>
        </li>
      </ul>
    </Container>
  );
};

const AppStatusBadge: React.VFC = () => {
  const status = useRecoilValue(appStatusState);

  return <MdPower size={16} color={getColorByStatus(status)} />;
};

function getColorByStatus(status: AppStatus): string {
  switch (status.type) {
    case "start":
    case "started":
      return START_COLOR;
    case "stop":
    case "stopped":
      return STOP_COLOR;
    case "kill":
      return KILL_COLOR;
    default:
      return "";
  }
}

export default AppHeader;
