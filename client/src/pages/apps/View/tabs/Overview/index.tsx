import React from "react";

import { Publish } from "@material-ui/icons";

import { Avatar, Button, TextField } from "@material-ui/core";

import { AppTabProps } from "..";

import { container } from "tsyringe";

import useObservable from "utils/useObservable";

import DaemonService, { DAEMON_SERVICE_KEY } from "services/DaemonService";

import {
  useInfoSectionStyles,
  usePeopleSectionStyles,
  useStyles,
} from "./styles";

const letters: string[] = [];
// @ts-ignore
for (const x of Array(3).keys()) {
  letters.push(String.fromCharCode("A".charCodeAt(0) + x));
}

const OverviewPage: React.VFC<AppTabProps> = ({ app }) => {
  const classes = useStyles();
  const infoSectionClasses = useInfoSectionStyles();
  const peopleSectionClasses = usePeopleSectionStyles();

  const daemonService = container.resolve<DaemonService>(DAEMON_SERVICE_KEY);

  const [appState] = useObservable(app.state$);

  function handleDeploy() {
    daemonService.deploy(app);
  }

  return (
    <div className={classes.root}>
      <section className={infoSectionClasses.root}>
        <h3 className={classes.title}>Project info:</h3>

        <ul className={infoSectionClasses.fields}>
          <li>
            <TextField
              className={infoSectionClasses.field}
              disabled
              size={"small"}
              value={app.id}
              label={"Id"}
              variant={"outlined"}
            />
          </li>

          <li>
            <TextField
              className={infoSectionClasses.field}
              disabled
              size={"small"}
              value={app.name}
              label={"Name"}
              variant={"outlined"}
            />
          </li>

          <li>
            <TextField
              className={infoSectionClasses.field}
              disabled
              size={"small"}
              value={app.image}
              label={"Image"}
              variant={"outlined"}
            />
          </li>

          <li className={infoSectionClasses.fieldGroup}>
            <TextField
              className={infoSectionClasses.stateField}
              disabled
              size={"small"}
              value={appState ?? "Loading..."}
              label={"State"}
              variant={"outlined"}
            />

            <Button onClick={handleDeploy}>
              <Publish /> Deploy
            </Button>
          </li>
        </ul>
      </section>

      <section className={peopleSectionClasses.root}>
        <h3 className={classes.title}>People:</h3>

        <ul className={peopleSectionClasses.people}>
          {letters.map((letter, index) => (
            <li key={index} className={peopleSectionClasses.person}>
              <Avatar>{letter}</Avatar>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OverviewPage;
