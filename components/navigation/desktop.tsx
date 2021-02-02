import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Link from "next/link";
import React from "react";
import { LogoAvatar } from "../logo";
import { SessionAvatar } from "../SessionAvatar";

export const TopNavDesktop = (props: { title?: string }) => {
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

          <SessionAvatar />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
