import React from "react";

import { Skeleton } from "@material-ui/lab";

import { Container } from "./styles";

const Loading: React.VFC = () => (
  <Container>
    <Skeleton variant="rect" width={400} height={38} />

    <ul>
      <li>
        <Skeleton variant="rect" width={102} height={38} />
      </li>

      <li>
        <Skeleton variant="rect" width={64} height={38} />
      </li>

      <li>
        <Skeleton variant="rect" width={64} height={38} />
      </li>

      <li>
        <Skeleton variant="rect" width={64} height={38} />
      </li>
    </ul>
  </Container>
);

export default Loading;
