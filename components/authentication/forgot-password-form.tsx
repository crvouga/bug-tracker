import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { LogoAvatar } from "../logo";

export type IForgotPasswordFormProps = {
  onSignIn?: () => void;
  onSubmit?: () => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  textField: {
    marginBottom: theme.spacing(1),
  },

  submitButton: {
    marginTop: theme.spacing(2),
  },

  links: {
    paddingTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const ForgotPasswordForm = (props: IForgotPasswordFormProps) => {
  const { onSignIn } = props;
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box className={classes.root}>
      <LogoAvatar className={classes.avatar} />
      <Typography variant="h5" align="center" gutterBottom>
        Forgot Password
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Email Address"
          type="email"
          name="emailAddress"
          fullWidth
        />

        <Button
          className={classes.submitButton}
          fullWidth
          color="primary"
          size="large"
          variant="contained"
          type="submit"
        >
          Send Reset Password Email
        </Button>
      </form>
      <Box className={classes.links}>
        <Button size="small" onClick={onSignIn}>
          Remember Password?
        </Button>
      </Box>
    </Box>
  );
};
