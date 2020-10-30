import React, { ReactNode } from "react";

import Sidebar from "components/Sidebar";

import { useStyles } from "./styles";

export type LayoutProps = {
  header?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />

      <div className={classes.wrapper}>
        {header && (
          <header className={classes.headerWrapper}>
            <div className={classes.headerContent}>{header}</div>
          </header>
        )}
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
