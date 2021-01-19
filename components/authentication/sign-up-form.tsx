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

type ISignUpData = {
  name: string;
  emailAddress: string;
  password: string;
};

export type ISignInFormProps = {
  onSignIn?: () => void;
  onSubmit?: (data: ISignUpData) => Promise<void>;
};

const useStyles = makeStyles((theme) => ({
  root: {
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
    marginTop: theme.spacing(3),
  },

  links: {
    paddingTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

export const SignUpForm = (props: ISignInFormProps) => {
  const { onSubmit, onSignIn } = props;
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = getFormDataValue(formData, "name");
    const emailAddress = getFormDataValue(formData, "emailAddress");
    const password = getFormDataValue(formData, "password");

    onSubmit?.({
      name,
      emailAddress,
      password,
    });
  };

  return (
    <Box className={classes.root}>
      <LogoAvatar className={classes.avatar} />
      <Typography variant="h5" align="center" gutterBottom>
        Create Account
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField className={classes.textField} label="Name" name="name" />
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
          Create New Account
        </Button>
      </form>
      <Box className={classes.links}>
        <Button onClick={onSignIn}>Sign In?</Button>
      </Box>
    </Box>
  );
};
