import React from "react";

import { container } from "tsyringe";
import { useHistory } from "react-router";

import { ArrowBack } from "@material-ui/icons";
import { Button } from "@material-ui/core";

import { DAEMON_SERVICE_KEY } from "services/DaemonService";
import App, { AppState } from "models/App";

import useObservable from "utils/useObservable";

import { Container, ActionButton, Actions } from "./styles";

type HeaderProps = {
  app?: App;
};

const Header: React.VFC<HeaderProps> = ({ app }) => {
  const history = useHistory();

  const [appState] = useObservable(app?.state$);

  const daemonService = container.resolve(DAEMON_SERVICE_KEY);

  function handleBack() {
    history.push("/apps");
  }

  function handleStart() {
    if (!app) return;

    daemonService.start(app);
  }

  function handleStop() {
    if (!app) return;

    daemonService.stop(app);
  }

  function handleKill() {
    if (!app) return;

    daemonService.kill(app);
  }

  return (
    <Container>
      <Button onClick={handleBack}>
        <ArrowBack />
      </Button>

      <Actions>
        <ActionButton
          disabled={
            appState === AppState.STARTING || appState === AppState.STARTED
          }
          color={"primary"}
          variant={"outlined"}
          size={"small"}
          onClick={handleStart}
        >
          Start
        </ActionButton>

        <ActionButton
          disabled={
            appState === AppState.STOPPED || appState === AppState.STOPPING
          }
          size={"small"}
          variant={"outlined"}
          onClick={handleStop}
        >
          Stop
        </ActionButton>

        <ActionButton
          disabled={appState === AppState.STOPPED}
          color={"secondary"}
          size={"small"}
          variant={"outlined"}
          onClick={handleKill}
        >
          Kill
        </ActionButton>
      </Actions>
    </Container>
  );
};

export default Header;
