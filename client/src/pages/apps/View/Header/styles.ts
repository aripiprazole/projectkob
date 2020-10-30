import { Button } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  padding: 8px 0;
`;

export const Actions = styled.div`
  margin-left: auto;
`;

export const ActionButton = styled(Button)`
  margin-left: 8px;
`;
