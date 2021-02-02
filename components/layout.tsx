import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import React from "react";
import { Hidden, makeStyles } from "@material-ui/core";
import { BottomNavSmall } from "./navigation/small";
import { SideNavLarge } from "./navigation/large";

type ILayoutProps = {
  children: JSX.Element;
  title?: string;
};

const variants = {
  initial: {
    opacity: 0,
  },
  out: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
};

export const AnimationLayout = (props: { children: JSX.Element }) => {
  const { children } = props;

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={variants}>
      {children}
    </motion.div>
  );
};

const useStyles = makeStyles(() => ({
  lg: {
    display: "flex",
    flexDirection: "row",
  },
  sm: {},
}));

export const Layout = (props: ILayoutProps) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <React.Fragment>
      <Hidden xsDown>
        <Container disableGutters maxWidth="lg">
          <div className={classes.lg}>
            <SideNavLarge />
            <AnimationLayout>{children}</AnimationLayout>
          </div>
        </Container>
      </Hidden>
      <Hidden smUp>
        <div className={classes.sm}>
          <BottomNavSmall />
          <AnimationLayout>{children}</AnimationLayout>
        </div>
      </Hidden>
    </React.Fragment>
  );
};
