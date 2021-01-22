import { makeStyles } from "@material-ui/core/styles";
import { SessionProvider } from "next-auth/client";
import React from "react";
import { signIn } from "../session";
import { SocialSignInButton } from "./social-sign-in";

export type ISignInFormProps = {
  providers: SessionProvider[];
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1, 0),
    width: "100%",
  },
}));

export const SignInForm = (props: ISignInFormProps) => {
  const { providers } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {providers.map((provider) => (
        <SocialSignInButton
          key={provider.id}
          provider={provider}
          onClick={() => {
            signIn(provider.id);
          }}
        />
      ))}
    </div>
  );
};
