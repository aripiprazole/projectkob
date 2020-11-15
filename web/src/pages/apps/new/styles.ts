import styled from "styled-components";

import { MenuItem } from "@material-ui/core";

import { ShrinkContainer } from "~/styles/components";

export const Container = styled(ShrinkContainer)`
  > form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 400px;
  }
`;

export const RepoItem = styled.div`
  flex: 1;

  display: grid;
  align-items: center;

  grid-template-columns: 32px 1fr 32px;

  > .name {
    overflow: hidden;
  }
`;
