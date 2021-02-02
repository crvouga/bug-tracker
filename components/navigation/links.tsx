import { SvgIconProps } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";

export type ITopLevelLink = {
  label: string;
  pathname: string;
  Icon: (props: SvgIconProps) => React.ReactNode;
};

export const TOP_LEVEL_LINKS: ITopLevelLink[] = [
  {
    label: "Home",
    pathname: "/",
    Icon: (props: SvgIconProps) => <HomeIcon {...props} />,
  },
  {
    label: "Dashboard",
    pathname: "/dashboard",
    Icon: (props: SvgIconProps) => <DashboardIcon {...props} />,
  },
  {
    label: "Profile",
    pathname: "/profile",
    Icon: (props: SvgIconProps) => <PersonIcon {...props} />,
  },
];
