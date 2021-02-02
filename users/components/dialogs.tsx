import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { UserListItem } from "../../users/components/list-item";
import { IUser } from "../contracts";

export const UserOptionsDialog = ({
  user,
  onSignOut,
  onClose,
  ...props
}: {
  user: IUser;
  onSignOut: () => void;
  onClose: () => void;
} & DialogProps) => {
  return (
    <Dialog {...props}>
      <List>
        <UserListItem user={user} />
        <ListItem button onClick={onSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
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
