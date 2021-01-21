import { Container } from "@material-ui/core";
import React from "react";
import { useSession } from "../authentication/components/session";
import { Layout } from "../components/layout";

const Index = () => {
  const [session] = useSession();

  return (
    <Layout>
      <Container maxWidth="lg">{JSON.stringify(session)}</Container>
    </Layout>
  );
};

export default Index;
