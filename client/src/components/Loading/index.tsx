import React from "react";

import { CircularProgress } from "@material-ui/core";

import { useStyles } from "./styles";

type LoadingProps = {
  small?: boolean;
  fill?: boolean;
};

const Loading: React.VFC<LoadingProps> = ({ small, fill = true }) => {
  const classes = useStyles();
  const size = small ? 24 : 30;
  const fillCssClass = fill ? classes.fill : "";

  return (
    <div className={`${classes.root} ${fillCssClass}`}>
      <CircularProgress className={classes.icon} size={size} />
    </div>
  );
};

export default Loading;
