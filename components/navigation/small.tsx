import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SessionAvatar } from "../session-avatar";
import { TOP_LEVEL_LINKS } from "./links";

export const TopNavSmall = (props: { title?: string }) => {
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

export const BottomNavSmall = () => {
  const router = useRouter();
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
