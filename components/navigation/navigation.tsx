import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { LogoAvatar } from "../logo";

export type INavBarProps = {
  title?: string;
};

export const NavMobile = () => {
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

      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Box marginRight={1}>
            <Link href="/">
              <LogoAvatar />
            </Link>
          </Box>

          <Typography variant="h6">{title}</Typography>

          <Box flex={1} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export const NavBar = () => {};
