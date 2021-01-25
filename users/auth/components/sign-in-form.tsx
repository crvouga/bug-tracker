import { makeStyles } from "@material-ui/core/styles";
import { SessionProvider, signIn } from "next-auth/client";
import React from "react";
import { SocialSignInButton } from "./social-sign-in";
import { Box } from "@material-ui/core";

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
        <Box key={provider.id} paddingBottom={2}>
          <SocialSignInButton
            provider={provider}
            onClick={() => {
              signIn(provider.id);
            }}
          />
        </Box>
      ))}
    </div>
  );
};
