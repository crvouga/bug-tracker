import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { LogoAvatar } from "../logo";
import { getFormDataValue } from "./utils";

export type ISignInData = {
  emailAddress: string;
  password: string;
};

export type ISignInFormProps = {
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSubmit?: (data: ISignInData) => void;
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

export const SignInForm = (props: ISignInFormProps) => {
  const { onSubmit, onForgotPassword, onSignUp } = props;
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const emailAddress = getFormDataValue(formData, "emailAddress");
    const password = getFormDataValue(formData, "password");

    onSubmit?.({
      emailAddress,
      password,
    });
  };

  return (
    <Box className={classes.root}>
      <LogoAvatar className={classes.avatar} />
      <Typography variant="h5" align="center" gutterBottom>
        Sign Into Bug Tracker
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Email Address"
          type="email"
          name="emailAddress"
          fullWidth
        />
        <TextField
          className={classes.textField}
          label="Password"
          type="password"
          name="password"
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
          Sign In
        </Button>
      </form>
      <Box className={classes.links}>
        <Button onClick={onForgotPassword}>Forgot Password?</Button>
        <Button onClick={onSignUp}>Create Account?</Button>
      </Box>
    </Box>
  );
};
