import {
  ListItemAvatar,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Avatar } from "../avatar";
import { SessionAvatar, useQuerySession } from "../session-avatar";
import { TOP_LEVEL_LINKS } from "./links";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "20%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  gutter: {
    flex: 1,
  },

  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

  typography: {
    fontWeight: "bold",
  },
}));

const SessionListItem = () => {
  const query = useQuerySession();

  if (query.isIdle || query.isLoading || query.isError) {
    return null;
  }

  const user = query.data;

  return (
    <ListItem button>
      <ListItemAvatar>
        <SessionAvatar />
      </ListItemAvatar>
      <ListItemText primary={user.displayName} secondary={user.emailAddress} />
      <ListItemSecondaryAction>
        <MoreHorizIcon />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export const SideNavLarge = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <List className={classes.root}>
      <Link href="/">
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/logo-dark.png" />
          </ListItemAvatar>
        </ListItem>
      </Link>

      {TOP_LEVEL_LINKS.map(({ pathname, label, Icon }) => (
        <Link key={pathname} href={pathname}>
          <ListItem button selected={router.pathname === pathname}>
            <ListItemIcon>{Icon({ className: classes.icon })}</ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                variant: "h6",
                className: classes.typography,
              }}
              primary={label}
            />
          </ListItem>
        </Link>
      ))}

      <div className={classes.gutter} />

      <SessionListItem />
    </List>
  );
};
