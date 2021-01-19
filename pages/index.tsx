import { Container } from "@material-ui/core";
import React from "react";
import { SignInForm } from "../components/authentication";

const Index = () => {
  return (
    <Container maxWidth="sm">
      <SignInForm />
    </Container>
  );
};

export default Index;
