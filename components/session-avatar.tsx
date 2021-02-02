import { useQuery } from "react-query";
import { User, IUser } from "../users/contracts";
import { Avatar } from "./avatar";
import { makeStyles } from "@material-ui/core";

const getSession = async () => {
  const response = await fetch("/api/session", {
    method: "GET",
  });

  const data = await response.json();

  const user = User(data);

  return user;
};

const SessionQueryKey = () => {
  return ["session"];
};

export const useQuerySession = () => {
  return useQuery(SessionQueryKey(), getSession);
};

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
  },
}));

export const UserAvatar = ({ user }: { user: IUser }) => {
  const classes = useStyles();

  return <Avatar className={classes.root} src={user.imageUrl} />;
};

export const SessionAvatar = () => {
  const classes = useStyles();
  const query = useQuerySession();

  if (query.isError || query.isLoading || query.isIdle) {
    return <Avatar className={classes.root} />;
  }

  const user = query.data;

  return <UserAvatar user={user} />;
};
