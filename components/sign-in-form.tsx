import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { IconLogo } from "./logo";

const getFormDataValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);

  if (typeof value === "string") {
    return value;
  }

  throw new Error(`failed to get form data value associated with ${value}`);
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2, 0),
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
  iconLogo: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.primary.main,
  },
  footer: {
    padding: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "space-between",
  },
}));

type ISignInData = {
  emailAddress: string;
  password: string;
};

export type ISignInFormProps = {
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onSubmit?: (data: ISignInData) => Promise<void>;
};

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
      <Box className={classes.header}>
        <IconLogo className={classes.iconLogo} />
        <Typography variant="h4">Sign In</Typography>
      </Box>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Email Address"
          type="email"
          name="emailAddress"
        />
        <TextField
          className={classes.textField}
          label="Password"
          type="password"
          name="password"
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
      <Box className={classes.footer}>
        <Button onClick={onForgotPassword}>Forgot Password?</Button>
        <Button onClick={onSignUp}>Sign Up</Button>
      </Box>
    </Box>
  );
};
