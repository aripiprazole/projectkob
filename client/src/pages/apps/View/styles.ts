import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
    flex: 1,
  },
}));

export type BadgeProps = {
  color?: string;
};

export const useBadgeStyles = makeStyles((theme) => ({
  root: (props: BadgeProps) => ({
    display: "flex",
    alignItems: "center",
    background: props.color ?? "#f9f9f9",
    padding: 4,
    marginLeft: theme.spacing(1.5),
    color: "#f9f9f9",
    width: "fit-content",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  }),
}));
