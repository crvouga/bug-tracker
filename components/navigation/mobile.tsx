import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SessionAvatar } from "../SessionAvatar";

export const TopNavMobile = (props: { title?: string }) => {
  const { title } = props;
  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6">{title}</Typography>

        <Box flex={1} />

        <SessionAvatar />
      </Toolbar>
    </AppBar>
  );
};

export const BottomNavMobile = () => {
  const router = useRouter();
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
