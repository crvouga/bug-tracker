import { Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "./sign-in";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);

  return {
    ...props,
  };
};

const Index = () => {
  return (
    <Layout title="Bug Tracker">
      <Typography>Hello</Typography>
    </Layout>
  );
};

export default Index;
