import { Fab, makeStyles, withStyles } from "@material-ui/core";

import { Pagination } from "@material-ui/lab";

export const CreateAppFab = withStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))(Fab);

export const StyledPagination = withStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))(Pagination);

export const useStyles = makeStyles({
  root: {
    flex: 1,
  },

  appLink: {
    borderBottom: "1px solid #d9d9d9",
    transition: "200ms ease-in",

    "&:hover": {
      filter: "brightness(80%)",
    },
  },
});
