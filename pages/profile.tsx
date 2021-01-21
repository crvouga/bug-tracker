import { Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "./sign-in";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);
  return {
    ...props,
  };
};

const Profile = () => {
  return (
    <Layout title="Dashboard">
      <Typography>profile</Typography>
    </Layout>
  );
};

export default Profile;
