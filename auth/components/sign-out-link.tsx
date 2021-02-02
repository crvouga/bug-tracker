import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import React from "react";

export const SignOutLink = () => {
  return (
    <Link href="/auth/sign-out">
      <ListItem component="div" button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </Link>
  );
};
