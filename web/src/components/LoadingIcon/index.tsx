import { CircularProgress } from "@material-ui/core";
import React, { Children } from "react";
import { MdCheck } from "react-icons/md";

import { Container, FabProgress } from "./styles";

export type LoadingItemProps = {
  loading?: boolean;
  success?: boolean;
  progressSize?: number;
};

const LoadingIcon: React.FC<LoadingItemProps> = ({
  loading = false,
  success = false,
  children,
}) => {
  return (
    <Container disabled={success || loading} success={success}>
      <div className="content">{Children.only(children)}</div>

      {success && (
        <FabProgress>
          <MdCheck size={18} />
        </FabProgress>
      )}

      {loading && (
        <FabProgress>
          <CircularProgress />
        </FabProgress>
      )}
    </Container>
  );
};

export default LoadingIcon;
