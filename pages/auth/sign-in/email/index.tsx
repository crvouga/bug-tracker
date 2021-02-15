import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { signIn } from "next-auth/client";
import Image from "next/image";
import React, { useState } from "react";
import { getFormDataValue, validateEmailAddress } from "../../../../shared";
import { LayoutPageDialog } from "../../../../components/auth/layout";

const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
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
    <LayoutPageDialog>
      <Image
        className={classes.icon}
        alt="email logo"
        width="100px"
        height="100px"
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
    </LayoutPageDialog>
  );
};

export default Email;
