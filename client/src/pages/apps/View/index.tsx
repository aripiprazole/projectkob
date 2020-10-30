import React, { useCallback, useEffect, useState } from "react";

import { container } from "tsyringe";
import { useLocation } from "react-router";

import { useTheme } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import { DAEMON_SERVICE_KEY } from "services/DaemonService";
import { APP_SERVICE_KEY } from "services/AppService";
import App, { AppState } from "models/App";

import TabPanel from "components/TabPanel";

import OverviewPage from "./tabs/Overview";
import HealthPage from "./tabs/Health";
import LogsPage from "./tabs/Logs";
import SettingsPage from "./tabs/Settings";

import Header from "./Header";
import StyledTabs from "./StyledTabs";
import StyledTab from "./StyledTab";

import Layout from "components/Layout";
import Loading from "components/Loading";

import { useStyles, useBadgeStyles } from "./styles";

const DEFAULT_SECTION = "home";

type Status = {
  color: string;
  title: string;
};

const AppHomePage: React.VFC = () => {
  const classes = useStyles();

  const theme = useTheme();
  const location = useLocation();

  const [uuid, setUUID] = useState<string>();
  const [section, setSection] = useState(0);

  const [app, setApp] = useState<App>();
  const [, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<Status>();

  const badgeClasses = useBadgeStyles({
    color: status?.color,
  });

  const updateUrl = useCallback(
    (newSection: number) => {
      const newSectionName = getSectionNameByIndex(newSection);
      const data = {};
      const title = document.title;
      const url = `${location.pathname}?uuid=${uuid}&section=${newSectionName}`;

      window.history.replaceState(data, title, url);
    },
    [location.pathname, uuid]
  );

  const daemonService = container.resolve(DAEMON_SERVICE_KEY);
  const appService = container.resolve(APP_SERVICE_KEY);

  // listen app status
  useEffect(() => {
    if (!app) return;

    const stateObservable = daemonService.listenState(app);

    const subscriptions = [
      stateObservable.subscribe((state) => {
        console.log("Receving update from stateObservable", state);

        setStatus(getStatusOfAppState(state));
      }),
      stateObservable.subscribe(app.state$),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [app, daemonService]);

  // load url parameters
  useEffect(() => {
    const parameters = new URLSearchParams(location.search);
    const uuid = parameters.get("uuid") ?? "";
    const section = parameters.get("section") ?? DEFAULT_SECTION;
    const initialSection = getIndexBySectionName(section);

    setUUID(uuid);
    setSection(initialSection);

    updateUrl(initialSection);
  }, [location.search, updateUrl]);

  // load app
  useEffect(() => {
    if (!uuid) return;

    appService
      .findById(uuid)
      .then(setApp)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [appService, uuid]);

  function handleChangeTab(_: unknown, newSection: number) {
    setSection(newSection);
    updateUrl(newSection);
  }

  const header = loading ? (
    <Loading small fill={false} />
  ) : app && status ? (
    <>
      <h2>{app.name}</h2>
      <span className={badgeClasses.root}>{status.title}</span>
    </>
  ) : (
    <div />
  );

  return (
    <Layout header={header}>
      <Header app={app} />

      <StyledTabs value={section} onChange={handleChangeTab}>
        <StyledTab label={"Overview"} />
        <StyledTab label={"Logs"} />
        <StyledTab label={"Health (Coming soon)"} />
        <StyledTab label={"Settings"} />
      </StyledTabs>

      {loading ? (
        <Loading />
      ) : app ? (
        <SwipeableViews
          style={{ flex: 1, display: "flex" }}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={section}
          onChangeIndex={handleChangeTab}
        >
          <TabPanel value={section} index={0} direction={theme.direction}>
            <div className={classes.content}>
              <OverviewPage app={app} />
            </div>
          </TabPanel>

          <TabPanel value={section} index={1} direction={theme.direction}>
            <div className={classes.content}>
              <LogsPage />
            </div>
          </TabPanel>

          <TabPanel value={section} index={2} direction={theme.direction}>
            <div className={classes.content}>
              <HealthPage />
            </div>
          </TabPanel>

          <TabPanel value={section} index={3} direction={theme.direction}>
            <div className={classes.content}>
              <SettingsPage />
            </div>
          </TabPanel>
        </SwipeableViews>
      ) : null}
    </Layout>
  );
};

function getStatusOfAppState(appState: AppState): Status {
  switch (appState) {
    case AppState.STARTED:
      return {
        title: "Started",
        color: "#331ee7",
      };
    case AppState.STARTING:
      return {
        title: "Starting",
        color: "#331ee7",
      };
    case AppState.STOPPED:
      return {
        title: "Not running",
        color: "#101010",
      };
    case AppState.STOPPING:
      return {
        title: "Stopping",
        color: "#101010",
      };
  }
}

const tabs = ["overview", "logs", "health", "settings"];

function getIndexBySectionName(sectionName: string): number {
  const index = tabs.indexOf(sectionName);

  return index >= 0 ? index : 0;
}

function getSectionNameByIndex(index: number): string {
  return tabs[index] ?? "overview";
}

export default AppHomePage;
