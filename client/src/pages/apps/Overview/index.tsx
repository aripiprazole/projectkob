import React, { useEffect, useState } from "react";

import { container } from "tsyringe";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Add, Tune } from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

import { APP_SERVICE_KEY } from "services/AppService";
import App from "models/App";

import Layout from "components/Layout";
import Loading from "components/Loading";

import { useStyles, CreateAppFab, StyledPagination } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppsAction } from "store/modules/apps/actions";

const AppsOverview: React.VFC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { apps, loading } = useSelector((state) => state.apps);

  const [currentPage, setCurrentPage] = useState(1);

  const appService = container.resolve(APP_SERVICE_KEY);

  useEffect(() => {
    const parameters = new URLSearchParams(location.search);

    setCurrentPage(parseInt(parameters.get("page") ?? "1"));
  }, [location.search]);

  useEffect(() => {
    if (currentPage === apps?.currentPage) return;

    dispatch(fetchAppsAction(currentPage));
  }, [appService, apps, currentPage, dispatch]);

  return (
    <Layout header={<h2>Apps</h2>}>
      <div className={classes.root}>
        {loading ? (
          <Loading />
        ) : (
          <List>
            <ListSubheader>Your apps</ListSubheader>
            {apps?.items?.map((app, index) => (
              <ListItem className={classes.appLink} key={index}>
                <ListItemIcon>
                  <Tune />
                </ListItemIcon>

                <ListItemText>
                  <Link to={`/apps/view?uuid=${app.id}`}>{app.name}</Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </div>

      <StyledPagination
        page={currentPage}
        color={"primary"}
        onChange={(_, newPage) => history.push(`/apps?page=${newPage}`)}
        count={apps?.pages ?? 1}
        shape={"rounded"}
      />

      <CreateAppFab
        aria-label={"Create app"}
        color={"primary"}
        onClick={() => history.push("/apps/new")}
      >
        <Add />
      </CreateAppFab>
    </Layout>
  );
};

export default AppsOverview;
