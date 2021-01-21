import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSession } from "../authentication/components/session";

export const NavBar = () => {
  const [session, isLoading] = useSession();

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Box marginRight={1}>
          <Avatar src="/logo-dark.svg" />
        </Box>
        <Typography variant="h5">Bug Tracker</Typography>
        <Box flex={1} />
        {isLoading && <CircularProgress />}
        {session?.user && (
          <Avatar
            style={{ backgroundColor: "#fff" }}
            src={session.user.image || ""}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
