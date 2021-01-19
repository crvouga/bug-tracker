import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { SignUpForm } from "../components/authentication/sign-up-form";

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <Container maxWidth="sm">
      <SignUpForm onSignIn={handleSignIn} />
    </Container>
  );
};

export default SignIn;
