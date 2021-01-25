import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "../users/auth/utility";
import { useSession, signOut } from "next-auth/client";
import { Avatar, Button } from "@material-ui/core";

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
