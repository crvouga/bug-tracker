import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { signOut, useSession } from "../../authentication/session";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

export type INavBarProps = {
  title?: string;
};

export const NavDrawer = () => {
  return (
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
  );
};

export const NavMobile = () => {
  const router = useRouter();
  return (
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
  );
};

type IUserDto = {
  image?: string | null;
};

export const SessionAvatarMenu = ({
  session,
}: {
  session: { user: IUserDto };
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <React.Fragment>
      <ButtonBase onClick={handleClick}>
        <Avatar
          style={{ backgroundColor: "#fff" }}
          src={session.user.image || ""}
        />
      </ButtonBase>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export const NavBar = (props: INavBarProps) => {
  const { title } = props;

  const [session] = useSession();

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Box marginRight={1}>
          <Link href="/">
            <Avatar src="/logo-dark.svg" />
          </Link>
        </Box>

        <Typography variant="h6">{title}</Typography>

        <Box flex={1} />
        {session?.user && <SessionAvatarMenu session={session} />}
      </Toolbar>
    </AppBar>
  );
};
