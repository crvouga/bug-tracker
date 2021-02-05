import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import React from "react";
import { LayoutDialog } from "../../../../components/auth/layout";

const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },

  title: {
    margin: theme.spacing(2, 0),
  },

  text: {
    margin: theme.spacing(0, 4),
    marginBottom: theme.spacing(1),
  },

  toolbar: {
    justifyContent: "left",
    alignItems: "left",
    marginBottom: theme.spacing(2),
  },
}));

const Sent = () => {
  const classes = useStyles();

  return (
    <LayoutDialog>
      <Image
        className={classes.icon}
        alt="email logo"
        width="120px"
        height="120px"
        src="/email-icon.png"
      />

      <Typography
        className={classes.title}
        align="center"
        variant="h3"
        gutterBottom
      >
        Email sent!
      </Typography>

      <Typography className={classes.text} align="center" variant="h6">
        Click the sign in button in the email to sign in.
      </Typography>
    </LayoutDialog>
  );
};

export default Sent;
