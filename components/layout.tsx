import { Container, Box, Hidden } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { NavBar, NavDrawer, NavMobile } from "./navigation/navigation";

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
  const { children, title } = props;

  return (
    <React.Fragment>
      <NavBar title={title} />
      <NavDrawer />
      <Container disableGutters maxWidth="lg">
        <AnimationLayout>{children}</AnimationLayout>
      </Container>
      <Hidden smUp>
        <Box width="100%" position="fixed" bottom={0}>
          <NavMobile />
        </Box>
      </Hidden>
    </React.Fragment>
  );
};
