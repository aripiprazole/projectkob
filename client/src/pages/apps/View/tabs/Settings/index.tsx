import React from "react";

import { useStyles } from "./styles";

const SettingsPage: React.VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>PINTO PEQUENO</h1>
    </div>
  );
};

export default SettingsPage;
