import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IUser } from "../../users/contracts";
import { Avatar } from "../avatar";
import { SessionAvatar, useQuerySession, UserAvatar } from "../session-avatar";
import { useBoolean } from "../use-boolean";
import { TOP_LEVEL_LINKS } from "./links";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
  listItem: {
    margin: theme.spacing(1 / 2),
    borderRadius: theme.spacing(1),
  },
}));

export const UserListItem = ({ user }: { user: IUser }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar user={user} />
      </ListItemAvatar>
      <ListItemText primary={user.displayName} secondary={user.emailAddress} />
    </ListItem>
  );
};

const SessionListItem = () => {
  const classes = useStyles();
  const query = useQuerySession();
  const isOpen = useBoolean(false);

  if (query.isIdle || query.isLoading || query.isError) {
    return null;
  }

  const user = query.data;

  return (
    <React.Fragment>
      <ListItem button className={classes.listItem} onClick={isOpen.setTrue}>
        <ListItemAvatar>
          <SessionAvatar />
        </ListItemAvatar>
        <ListItemText
          primary={user.displayName}
          secondary={user.emailAddress}
        />
      </ListItem>
      <Dialog open={isOpen.value} onClose={isOpen.setFalse}>
        <List>
          <UserListItem user={user} />
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export const SideNavLarge = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <List className={classes.root}>
      <Link href="/">
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar src="/logo-dark.png" />
          </ListItemAvatar>
        </ListItem>
      </Link>

      {TOP_LEVEL_LINKS.map(({ pathname, label, Icon }) => (
        <Link key={pathname} href={pathname}>
          <ListItem
            button
            selected={router.pathname === pathname}
            className={classes.listItem}
          >
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
