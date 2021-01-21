import { List, makeStyles } from "@material-ui/core";
import { SessionProvider } from "next-auth/client";
import React from "react";
import { signIn } from "../session";
import { SocialSignInButton } from "./social-sign-in";

export type ISignInFormProps = {
  providers: SessionProvider[];
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}));

export const SignInForm = (props: ISignInFormProps) => {
  const { providers } = props;

  const classes = useStyles();

  return (
    <List className={classes.root}>
      {providers.map((provider) => (
        <SocialSignInButton
          key={provider.id}
          provider={provider}
          onClick={() => {
            signIn(provider.id);
          }}
        />
      ))}
    </List>
  );
};
