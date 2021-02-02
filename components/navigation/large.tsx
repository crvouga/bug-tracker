import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { UserOptionsDialog } from "../../users/components/dialogs";
import {
  UserListItem,
  UserListItemSkeleton,
} from "../../users/components/list-item";
import { useQuerySession } from "../../users/query/session";
import { LogoListItem } from "../logo";
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
  const router = useRouter();

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

      <UserOptionsDialog
        user={user}
        open={isOpen.value}
        onClose={isOpen.setFalse}
        onSignOut={() => {
          router.push("/auth/sign-out");
        }}
      />
    </React.Fragment>
  );
};

export const SideNavLarge = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <List component="nav" className={classes.root}>
      <Link href="/">
        <LogoListItem divider />
      </Link>

      <Box flex={1}>
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
      </Box>

      <SessionListItem />
    </List>
  );
};
