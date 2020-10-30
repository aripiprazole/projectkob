import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },

  wrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowX: "auto",
    overflowY: "auto",
  },

  headerContent: {
    display: "flex",
    maxWidth: 1000,
    width: "100%",
    margin: "0 auto",
    alignItems: "center",
  },

  headerWrapper: {
    display: "flex",
    minHeight: 54,
    height: 54,
    padding: theme.spacing(2),
    borderBottom: "1px solid #d9d9d9",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxWidth: 1000,
    width: "100%",
    padding: theme.spacing(2),
    margin: "0 auto",
  },
}));
