import React from "react";

import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";

import { MdPower, MdNote } from "react-icons/md";

import { appState, appStatusState } from "~/store/apps";

import { Container, ActionButton } from "./styles";

import AppStatus, { Kill, Start, Stop } from "~/entities/app-status";

const START_COLOR = "#15ed44";
const STOP_COLOR = "#e36319";
const KILL_COLOR = "#f0164c";

type Props = {
  appId: string;
};

const AppHeader: React.VFC<Props> = ({ appId }) => {
  const [status, setStatus] = useRecoilState(appStatusState);

  const { name } = useRecoilValue(appState(appId));

  return (
    <Container>
      <h1>
        {name}

        <span>
          <MdPower size={16} color={getColorByStatus(status)} />
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
          <ActionButton
            disabled={status.type !== "deployed"}
            color={status.type === "deployed" ? "primary" : undefined}
            onClick={() => setStatus(Start)}
          >
            <MdPower size={16} />

            {status.type === "deployed" && <span className="text">Start</span>}
          </ActionButton>
        </li>

        <li>
          <ActionButton
            disabled={status.type !== "started"}
            color={status.type === "started" ? "primary" : undefined}
            onClick={() => setStatus(Stop)}
          >
            <MdPower size={16} />

            {status.type === "started" && <span className="text">Stop</span>}
          </ActionButton>
        </li>

        <li>
          <ActionButton
            disabled={status.type !== "started"}
            color={status.type === "started" ? "primary" : undefined}
            onClick={() => setStatus(Kill)}
          >
            <MdPower size={16} />

            {status.type === "started" && <span className="text">Kill</span>}
          </ActionButton>
        </li>
      </ul>
    </Container>
  );
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
