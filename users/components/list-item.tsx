import Avatar from "@material-ui/core/Avatar";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { IUser } from "../contracts";
import { UserAvatar } from "./avatar";

export const UserListItem = ({
  user,
  ...props
}: { user: IUser } & ListItemProps) => {
  return (
    //@ts-ignore
    <ListItem {...props}>
      <ListItemAvatar>
        <UserAvatar user={user} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
        primary={user.displayName}
        secondary={user.emailAddress}
      />
    </ListItem>
  );
};

export const UserListItemSkeleton = (props: ListItemProps) => {
  return (
    //@ts-ignore
    <ListItem {...props}>
      <ListItemAvatar>
        <Skeleton variant="circle">
          <Avatar />
        </Skeleton>
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton variant="text" width="10em" height="1.5em" />}
        secondary={<Skeleton variant="text" width="100%" height="1.5em" />}
      />
    </ListItem>
  );
};
