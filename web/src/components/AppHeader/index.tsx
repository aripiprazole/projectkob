import React from "react";

import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";

import { FiPower, FiPaperclip } from "react-icons/fi";

import { appState, appStatusState } from "~/store/apps";

import { Header, Action, LogsAction } from "./styles";

import AppStatus, { Killing, Starting, Stopping } from "~/entities/app-status";

const START_COLOR = "#15ed44";
const STOP_COLOR = "#e36319";
const KILL_COLOR = "#f0164c";

function getColorByStatus(status: AppStatus): string {
  switch (status.type) {
    case "starting":
    case "started":
      return START_COLOR;
    case "stopping":
    case "stopped":
      return STOP_COLOR;
    case "killing":
      return KILL_COLOR;
    default:
      return "";
  }
}

type Props = {
  appId: string;
};

const AppHeader: React.VFC<Props> = ({ appId }) => {
  const [status, setStatus] = useRecoilState(appStatusState);

  const { name } = useRecoilValue(appState(appId));

  return (
    <Header>
      <h1>
        {name}

        <span>
          <FiPower size={16} color={getColorByStatus(status)} />
        </span>
      </h1>

      <ul>
        <li>
          <Link href="/apps/[appId]/logs" as={`/apps/${appId}/logs`}>
            <LogsAction>
              <FiPaperclip size={28} />

              <span>Logs</span>
            </LogsAction>
          </Link>
        </li>

        <li>
          <Action
            disabled={status.type !== "deployed"}
            onClick={() => setStatus(Starting)}
          >
            <FiPower color={START_COLOR} size={28} />
          </Action>
        </li>

        <li>
          <Action
            disabled={status.type !== "started"}
            onClick={() => setStatus(Stopping)}
          >
            <FiPower color={STOP_COLOR} size={28} />
          </Action>
        </li>

        <li>
          <Action
            disabled={status.type !== "started"}
            onClick={() => setStatus(Killing)}
          >
            <FiPower color={KILL_COLOR} size={28} />
          </Action>
        </li>
      </ul>
    </Header>
  );
};

export default AppHeader;
