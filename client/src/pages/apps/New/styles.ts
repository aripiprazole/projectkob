import { makeStyles } from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "400px",
    width: "100%",
  },

  form: {
    maxWidth: 400,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  input: {
    marginBottom: theme.spacing(2),
  },

  errorAlert: {
    marginBottom: theme.spacing(2),
  },
}));

export const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },

  button: {
    width: "fit-content",
  },

  submit: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },

  back: {
    marginLeft: 8,
  },

  wrapper: {
    position: "relative",
    marginRight: theme.spacing(1),
  },

  buttonSuccess: {
    backgroundColor: green[500],
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: green[700],
    },
  },

  buttonSuccessIcon: {
    marginRight: theme.spacing(1),
  },

  buttonProgress: {
    color: purple[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
