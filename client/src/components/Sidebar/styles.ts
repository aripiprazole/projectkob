import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: "#331ee7",
    "& *": {
      color: "#f9f9f9",
      background: "inherit",
    },
  },

  navbar: {
    margin: "0 auto",
    height: "100%",
  },

  items: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    listStyle: "none",
  },

  item: {
    display: "flex",
    transition: "200ms ease-in",

    "&:hover": {
      filter: "brightness(80%)",
    },
  },

  logout: {
    marginTop: "auto",

    display: "flex",
    transition: "200ms ease-in",

    "&:hover": {
      filter: "brightness(80%)",
    },
  },

  itemLink: {
    outline: 0,
    border: 0,
    cursor: "pointer",
    padding: 12,
    fontWeight: "bold",
    fontSize: 24,
    transition: "200ms ease-in",
  },

  dashboardIcon: {
    filter: "brightness(80%)",
  },
}));
