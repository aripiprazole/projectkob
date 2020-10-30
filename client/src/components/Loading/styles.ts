import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

type ContainerProps = {
  fill: string;
};

export const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },

  fill: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  icon: {
    margin: "auto",
  },
}));

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;

  flex: ${(props) => (props.fill === "true" ? 1 : 0)};

  width: 100%;
  height: 100%;

  > .icon {
    margin: auto;
  }
`;
