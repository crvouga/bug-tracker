import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SignOutLink } from "../auth/sign-out-link";
import { AvatarSkeleton } from "../avatar";
import { AnimationLayout } from "../layout";
import { useBoolean } from "../use-boolean";
import { UserAvatar } from "../users/avatar";
import { UserListItem } from "../users/list-item";
import { useQuerySession } from "../users/user-session";
import { TOP_LEVEL_LINKS } from "./links";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `solid ${theme.palette.divider} ${theme.spacing(1 / 4)}px`,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  list: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
}));

export const TopNavSmallSkeleton = () => {
  const classes = useStyles();
  return (
    <AppBar
      className={classes.appBar}
      position="sticky"
      color="default"
      elevation={0}
    >
      <Toolbar>
        <AvatarSkeleton className={classes.avatar} />
        <Skeleton variant="text" width="6em" height="3em" />
      </Toolbar>
    </AppBar>
  );
};

export const TopNavSmall = (props: { title?: string }) => {
  const { title } = props;
  const classes = useStyles();
  const query = useQuerySession();

  const isOpen = useBoolean(false);

  if (query.isError || query.isLoading || query.isIdle) {
    return <TopNavSmallSkeleton />;
  }

  const user = query.data;

  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.appBar} elevation={0}>
        <Toolbar>
          <UserAvatar
            className={classes.avatar}
            user={user}
            onClick={isOpen.setTrue}
          />
          <AnimationLayout>
            <Typography variant="h4" color="textPrimary">
              {title}
            </Typography>
          </AnimationLayout>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isOpen.value} onClose={isOpen.setFalse}>
        <List component="div" className={classes.list}>
          <ListItem button onClick={isOpen.setFalse}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
          </ListItem>
          <UserListItem user={user} />
          <Box flex={1} />
          <SignOutLink />
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export const BottomNavSmall = () => {
  const router = useRouter();
  return (
    <Box width="100%" position="fixed" bottom={0}>
      <BottomNavigation>
        {TOP_LEVEL_LINKS.map(({ label, Icon, pathname }) => (
          <Link key={pathname} href={pathname}>
            <BottomNavigationAction
              showLabel
              selected={router.pathname === pathname}
              icon={Icon({})}
              label={label}
            />
          </Link>
        ))}
      </BottomNavigation>
    </Box>
  );
};
