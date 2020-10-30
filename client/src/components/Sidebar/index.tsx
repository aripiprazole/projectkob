import React from "react";

import { Link } from "react-router-dom";

import {
  DashboardOutlined,
  AppsOutlined,
  HomeOutlined,
  ExitToApp,
} from "@material-ui/icons";

import { useStyles } from "./styles";
import { Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutSessionAction } from "store/modules/session/actions";

const Sidebar: React.VFC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <nav className={classes.navbar}>
        <ul className={classes.items}>
          <li className={classes.item}>
            <div className={`${classes.itemLink} ${classes.dashboardIcon}`}>
              <DashboardOutlined />
            </div>

            <Divider />
          </li>

          <li className={classes.item}>
            <Link className={classes.itemLink} to={"/"}>
              <HomeOutlined />
            </Link>
          </li>

          <li className={classes.item}>
            <Link className={classes.itemLink} to={"/apps"}>
              <AppsOutlined />
            </Link>
          </li>

          <li className={classes.logout}>
            <button
              className={classes.itemLink}
              onClick={() => dispatch(logoutSessionAction())}
            >
              <ExitToApp />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
