import React from "react";

import { Skeleton } from "@material-ui/lab";

import { Container, Fieldset, LoadingSpeedDial } from "./styles";

const AppDetailsLoading: React.VFC = () => (
  <Container>
    <h3>
      <Skeleton variant="rect" width={420} height={24} />
    </h3>

    <form onSubmit={(event) => event.preventDefault()} className="info">
      <Skeleton variant="rect" height={40} />
      <Skeleton variant="rect" height={40} />

      <Fieldset>
        <Skeleton variant="rect" width={400} height={40} />

        <Skeleton variant="rect" height={40} style={{ flex: 1 }} />
      </Fieldset>
    </form>

    <LoadingSpeedDial variant="circle" height={56} width={56} />
  </Container>
);

export default AppDetailsLoading;
