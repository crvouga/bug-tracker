import { Container } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";
import { useSession } from "../authentication/session";
import { Layout } from "../components/layout";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const Index = () => {
  const [session] = useSession();

  return (
    <Layout title="Bug Tracker">
      <Container maxWidth="lg">{JSON.stringify(session)}</Container>
    </Layout>
  );
};

export default Index;
