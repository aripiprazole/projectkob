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

export const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;

  > .text {
    margin-left: 12px;
  }
`;
