import { GetServerSideProps } from "next";
import { LayoutPage } from "../components/layout.page";
import { getProtectedRouteProps } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);
  return {
    ...props,
  };
};

const Profile = () => {
  return (
    <LayoutPage title="Profile">
      <div></div>
    </LayoutPage>
  );
};

export default Profile;
