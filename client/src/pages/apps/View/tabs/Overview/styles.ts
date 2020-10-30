import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {},

  title: {
    marginBottom: theme.spacing(2.5),
  },
}));

export const useInfoSectionStyles = makeStyles((theme) => ({
  root: {},

  fields: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    gap: `${theme.spacing(2)}px`,
    margin: `${theme.spacing(2.5)}px 0`,
    listStyle: "none",
  },

  fieldGroup: {
    display: "flex",
    alignItems: "center",
  },

  field: {
    width: "100%",
  },

  stateField: {
    width: "80%",
    marginRight: theme.spacing(2),
  },
}));

export const usePeopleSectionStyles = makeStyles((theme) => ({
  root: {},

  people: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 500,
    gap: `${theme.spacing(1)}px`,
    listStyle: "none",
  },

  person: {
    cursor: "pointer",
  },
}));
