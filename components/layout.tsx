import { Hidden, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import React from "react";
import { SideNavLarge } from "./navigation/large";
import { BottomNavSmall, TopNavSmall } from "./navigation/small";
import Head from "next/Head";

type ILayoutProps = React.PropsWithChildren<{
  title?: string;
}>;

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

export const AnimationLayout = (props: React.PropsWithChildren<{}>) => {
  const { children } = props;

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={variants}>
      {children}
    </motion.div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
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
      <Head>
        <title>
          {props.title ? `${props.title} | Bug Tracker` : "Bug Tracker"}
        </title>
      </Head>
      <Hidden xsDown>
        <Container disableGutters maxWidth="lg">
          <div className={classes.lg}>
            <SideNavLarge />
            <Container className={classes.container}>
              <AnimationLayout>{children}</AnimationLayout>
            </Container>
          </div>
        </Container>
      </Hidden>
      <Hidden smUp>
        <div className={classes.sm}>
          <TopNavSmall title={props.title} />
          <BottomNavSmall />
          <Container className={classes.container}>
            <AnimationLayout>{children}</AnimationLayout>
          </Container>
        </div>
      </Hidden>
    </React.Fragment>
  );
};
