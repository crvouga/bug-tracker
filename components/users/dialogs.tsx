import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { SignOutLink } from "../auth/sign-out-link";
import { UserListItem } from "./list-item";
import { IUser } from "../../server/auth/user/contracts";

export const UserOptionsDialog = ({
  user,
  onClose,
  ...props
}: {
  user: IUser;
  onClose: () => void;
} & DialogProps) => {
  return (
    <Dialog onClose={onClose} {...props}>
      <List>
        <UserListItem user={user} />
        <SignOutLink />
        <ListItem button onClick={onClose}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
      </List>
    </Dialog>
  );
};
