import React from "react";

import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";

import { FiPower, FiPaperclip } from "react-icons/fi";

import { appState, appStatusState } from "~/store/apps";

import { Header, ActionButton } from "./styles";

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
            <ActionButton color="secondary">
              <FiPaperclip size={16} />

              <span className="text">Logs</span>
            </ActionButton>
          </Link>
        </li>

        <li>
          <ActionButton
            disabled={status.type !== "deployed"}
            color={status.type === "deployed" ? "primary" : undefined}
            onClick={() => setStatus(Starting)}
          >
            <FiPower size={16} />

            <span className="text">Start</span>
          </ActionButton>
        </li>

        <li>
          <ActionButton
            disabled={status.type !== "started"}
            color={status.type === "started" ? "primary" : undefined}
            onClick={() => setStatus(Stopping)}
          >
            <FiPower size={16} />

            <span className="text">Stop</span>
          </ActionButton>
        </li>

        <li>
          <ActionButton
            disabled={status.type !== "started"}
            color={status.type === "started" ? "primary" : undefined}
            onClick={() => setStatus(Killing)}
          >
            <FiPower size={16} />

            <span className="text">Kill</span>
          </ActionButton>
        </li>
      </ul>
    </Header>
  );
};

export default AppHeader;
