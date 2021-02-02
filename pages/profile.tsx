import { GetServerSideProps } from "next";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);
  return {
    ...props,
  };
};

const Profile = () => {
  return (
    <Layout title="Profile">
      <div></div>
    </Layout>
  );
};

export default Profile;
