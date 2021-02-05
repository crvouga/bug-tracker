import { AvatarProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Avatar, AvatarSkeleton } from "../avatar";
import { IUser } from "../../server/auth/user/contracts";
import { useQuerySession } from "./user-session";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
  },
}));

export const UserAvatar = ({
  user,
  className,
  ...props
}: { user: IUser } & AvatarProps) => {
  const classes = useStyles();

  return (
    <Avatar
      alt={user.displayName ?? "user avater"}
      src={user.imageUrl}
      className={clsx(classes.root, className)}
      {...props}
    />
  );
};

export const SessionAvatar = () => {
  const query = useQuerySession();

  if (query.isError || query.isLoading || query.isIdle) {
    return <AvatarSkeleton />;
  }

  const user = query.data;

  return <UserAvatar user={user} />;
};
