import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4, 2),
      position: "absolute",
      top: 0,
      margin: 0,
      width: "100%",
    },
  },
}));

export const LayoutPageDialog = ({ children }: React.PropsWithChildren<{}>) => {
  const classes = useStyles();
  return (
    <Dialog open classes={classes}>
      {children}
    </Dialog>
  );
};
