import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { signIn } from "next-auth/client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimationLayout } from "../../../../components/layout";
import { getFormDataValue, validateEmailAddress } from "../../../../shared";

const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingY: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(8),
    },
  },
}));

const Email = () => {
  const classes = useStyles();

  const [errors, setErrors] = useState<Error[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const emailAddress = getFormDataValue(formData, "emailAddress");

    const errors = validateEmailAddress(emailAddress);

    if (errors.length > 0) {
      setErrors(errors);

      return;
    }

    await signIn("email", { email: emailAddress });
  };

  const handleChange = () => {
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <AnimationLayout>
      <Container maxWidth="xs" disableGutters>
        <Paper className={classes.paper}>
          <Image
            className={classes.icon}
            alt="email logo"
            width="120px"
            height="120px"
            src="/email-icon.png"
          />
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              id="email-address"
              label="Email Address"
              name="emailAddress"
              type="email"
              error={errors.length > 0}
              helperText={errors.length === 0 ? "" : errors[0].message}
              fullWidth
              onChange={handleChange}
            />

            <Button type="submit" fullWidth size="large" variant="outlined">
              Send Sign In Email
            </Button>
          </form>
        </Paper>
      </Container>
    </AnimationLayout>
  );
};

export default Email;
