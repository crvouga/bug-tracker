import React from "react";
import { Container, TextField } from "@material-ui/core";

const AuthenicationForm = () => {
  return (
    <form>
      <TextField label="email" type="email" />
      <TextField label="password" type="password" />
    </form>
  );
};

const Index = () => {
  return (
    <Container>
      <AuthenicationForm />
    </Container>
  );
};

export default Index;
