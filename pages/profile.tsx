import { Avatar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import { signOut, useSession } from "next-auth/client";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);
  return {
    ...props,
  };
};

const Profile = () => {
  const [session] = useSession();
  return (
    <Layout>
      <div>
        <Typography variant="h1" color="initial">
          profile
        </Typography>
        <Avatar
          src={session?.user.image ?? undefined}
          alt={session?.user.name ?? undefined}
        />
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </div>
    </Layout>
  );
};

export default Profile;
