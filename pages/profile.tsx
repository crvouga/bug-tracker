import { GetServerSideProps } from "next";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "./sign-in";
import Typography from "@material-ui/core/Typography";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);
  return {
    ...props,
  };
};

const Profile = () => {
  return (
    <Layout title="Dashboard">
      <Typography variant="h1" color="initial">
        profile
      </Typography>
    </Layout>
  );
};

export default Profile;
