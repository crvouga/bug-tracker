import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  UserListItem,
  UserListItemSkeleton,
} from "../../users/components/list-item";
import { useQuerySession } from "../../users/query/session";
import { LogoAvatar } from "../logo";
import { useBoolean } from "../use-boolean";
import { TOP_LEVEL_LINKS } from "./links";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  navList: {
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
    borderRadius: theme.spacing(1),
  },
}));

const SessionListItem = () => {
  const classes = useStyles();
  const query = useQuerySession();
  const isOpen = useBoolean(false);
  const isOpenSignOut = useBoolean(false);

  // used to prevent layout shift
  const width = "240px";

  if (query.isIdle || query.isLoading || query.isError) {
    return (
      <Box width={width}>
        <UserListItemSkeleton />
      </Box>
    );
  }

  const user = query.data;

  return (
    <React.Fragment>
      <Box width={width}>
        <UserListItem
          className={classes.listItem}
          button
          onClick={isOpen.setTrue}
          user={user}
        />
      </Box>

      <Dialog open={isOpen.value} onClose={isOpen.setFalse}>
        <List>
          <UserListItem user={user} />
          <ListItem
            button
            onClick={() => {
              isOpen.setFalse();
              isOpenSignOut.setTrue();
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
          <ListItem button onClick={isOpen.setFalse}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Close" />
          </ListItem>
        </List>
      </Dialog>

      <Dialog open={isOpenSignOut.value} onClose={isOpenSignOut.setFalse}>
        <DialogTitle>Sign Out?</DialogTitle>
        <DialogActions>
          <Button size="large" onClick={isOpenSignOut.setFalse}>
            Cancel
          </Button>
          <Button
            size="large"
            onClick={() => {
              signOut({
                callbackUrl: "/sign-in",
              });
            }}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export const SideNavLarge = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <List>
        <Link href="/">
          <ListItem className={classes.listItem}>
            <ListItemAvatar>
              <LogoAvatar />
            </ListItemAvatar>
            <ListItemText primary="Bug Tracker" />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List className={classes.navList}>
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
      </List>

      <List>
        <SessionListItem />
      </List>
    </div>
  );
};
