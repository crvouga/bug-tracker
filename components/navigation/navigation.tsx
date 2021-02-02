import Hidden from "@material-ui/core/Hidden";
import React from "react";
import { TopNavDesktop } from "./desktop";
import { BottomNavMobile, TopNavMobile } from "./mobile";

export const Nav = () => {
  return (
    <React.Fragment>
      <Hidden xsDown>
        <TopNavDesktop />
      </Hidden>
      <Hidden smUp>
        <TopNavMobile />
        <BottomNavMobile />
      </Hidden>
    </React.Fragment>
  );
};
