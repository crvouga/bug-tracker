import { makeStyles } from "@material-ui/core";
import { Avatar } from "../../components/avatar";
import { IUser } from "../contracts";
import { useQuerySession } from "../query/session";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
  },
}));

export const UserAvatar = ({ user }: { user: IUser }) => {
  const classes = useStyles();

  return (
    <Avatar
      alt={user.displayName ?? "user avater"}
      className={classes.root}
      src={user.imageUrl}
    />
  );
};

export const SessionAvatar = () => {
  const classes = useStyles();
  const query = useQuerySession();

  if (query.isError || query.isLoading || query.isIdle) {
    return <Avatar alt="loading avatar" className={classes.root} />;
  }

  const user = query.data;

  return <UserAvatar user={user} />;
};
