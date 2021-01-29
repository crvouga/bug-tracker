import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { GetServerSideProps } from "next";
import { getProviders, SessionProvider } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignInForm } from "../components/auth/sign-in-form";
import { AnimationLayout } from "../components/layout";

export type ISignInProps = {
  providers: SessionProvider[];
};

export const getServerSideProps: GetServerSideProps<ISignInProps> = async () => {
  const providers = Object.values((await getProviders()) || {});

  return {
    props: {
      providers,
    },
  };
};

const useStyles = makeStyles((theme) => ({
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

const SignIn = (props: ISignInProps) => {
  const { providers } = props;
  const classes = useStyles();

  return (
    <AnimationLayout>
      <Container maxWidth="xs" disableGutters>
        <Paper className={classes.paper}>
          <Link href="/">
            <Box paddingBottom={1}>
              <Image
                alt="bug tracker logo"
                width="120px"
                height="120px"
                src="/logo-dark.svg"
              />
            </Box>
          </Link>

          <SignInForm providers={providers} />
        </Paper>
      </Container>
    </AnimationLayout>
  );
};

export default SignIn;
