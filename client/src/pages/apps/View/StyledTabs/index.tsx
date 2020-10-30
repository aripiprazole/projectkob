import React from "react";

import { Tabs, withStyles } from "@material-ui/core";
import styled from "styled-components";

export type StyledTabsProps = {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
};

export default styled(Tabs)`
  .indicator {
    display: flex;
    justify-content: center;
    background: transparent;
    > span {
      max-width: 15;
      width: "100%";
      background: #fff;
    }
  }
`;
