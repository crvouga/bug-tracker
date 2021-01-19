import { Container } from "@material-ui/core";
import React from "react";
import { SignInForm } from "../components/authentication/sign-in-form";
import { SignUpForm } from "../components/authentication/sign-up-form";

const Index = () => {
  return (
    <Container maxWidth="sm">
      <SignInForm />
      <SignUpForm />
    </Container>
  );
};

export default Index;
