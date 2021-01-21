import { Container } from "@material-ui/core";
import React from "react";
import { signUpPasswordFormProps } from "../../authentication/components/props";
import { SignUpPasswordForm } from "../../authentication/components/sign-up-password-form";
import { Layout } from "../../components/layout";

const SignUp = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <SignUpPasswordForm {...signUpPasswordFormProps} />
      </Container>
    </Layout>
  );
};

export default SignUp;
