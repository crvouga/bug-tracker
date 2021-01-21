import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export type INavBarProps = {
  title?: string;
};

export const NavMobile = () => {
  const router = useRouter();
  return (
    <Box width="100%" position="fixed" bottom={0}>
      <BottomNavigation>
        <Link href="/">
          <BottomNavigationAction
            showLabel
            selected={router.pathname === "/"}
            icon={<HomeIcon />}
            label="Home"
          />
        </Link>
        <Link href="/dashboard">
          <BottomNavigationAction
            showLabel
            selected={router.pathname === "/dashboard"}
            icon={<DashboardIcon />}
            label="Dashboard"
          />
        </Link>
        <Link href="/profile">
          <BottomNavigationAction
            selected={router.pathname === "/profile"}
            showLabel
            icon={<PersonIcon />}
            label="Profile"
          />
        </Link>
      </BottomNavigation>
    </Box>
  );
};

export const NavDesktop = (props: INavBarProps) => {
  const { title } = props;

  return (
    <React.Fragment>
      <Drawer>
        <List>
          <Link href="/dashboard">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar>
          <Box marginRight={1}>
            <Link href="/">
              <Avatar src="/logo-dark.svg" />
            </Link>
          </Box>

          <Typography variant="h6">{title}</Typography>

          <Box flex={1} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
