import React from "react";

import { useRecoilState } from "recoil";

import { MdPower } from "react-icons/md";

import { appStatusState } from "~/store/apps";

import { Kill, Start, Stop } from "~/entities/app-status";

import { ActionButton } from "./styles";

export const ActionButtonLoading: React.FC = ({ children }) => {
  return (
    <ActionButton loading>
      <MdPower size={16} />

      <span className="text">{children}</span>
    </ActionButton>
  );
};

export const StartButton: React.VFC = () => {
  const [status, setStatus] = useRecoilState(appStatusState);

  return (
    <ActionButton
      disabled={status.type !== "deployed"}
      color={status.type === "deployed" ? "primary" : undefined}
      onClick={() => setStatus(Start)}
    >
      <MdPower size={16} />

      {status.type === "deployed" && <span className="text">Start</span>}
    </ActionButton>
  );
};

export const StopButton: React.VFC = () => {
  const [status, setStatus] = useRecoilState(appStatusState);

  return (
    <ActionButton
      disabled={status.type !== "started"}
      color={status.type === "started" ? "primary" : undefined}
      onClick={() => setStatus(Stop)}
    >
      <MdPower size={16} />

      {status.type === "started" && <span className="text">Stop</span>}
    </ActionButton>
  );
};

export const KillButton: React.VFC = () => {
  const [status, setStatus] = useRecoilState(appStatusState);

  return (
    <ActionButton
      disabled={status.type !== "started"}
      color={status.type === "started" ? "primary" : undefined}
      onClick={() => setStatus(Kill)}
    >
      <MdPower size={16} />

      {status.type === "started" && <span className="text">Kill</span>}
    </ActionButton>
  );
};
