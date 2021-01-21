import { Container, Hidden } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { NavDesktop, NavMobile } from "./navigation/navigation";

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

export const Layout = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="lg">
        <AnimationLayout>{children}</AnimationLayout>
      </Container>
      <Hidden smUp>
        <NavMobile />
      </Hidden>
      <Hidden xsDown>
        <NavDesktop />
      </Hidden>
    </React.Fragment>
  );
};
