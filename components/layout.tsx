import {
  Backdrop,
  CircularProgress,
  Container,
  makeStyles,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { useSession } from "../authentication/components/session";
import { NavBar } from "./navigation";

type ILayoutProps = {
  children: React.ReactNode;
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

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Layout = (props: ILayoutProps) => {
  const { children } = props;
  const [, isLoading] = useSession();
  const classes = useStyles();
  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <NavBar />
      <Container disableGutters maxWidth="lg">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={variants}
        >
          {children}
        </motion.div>
      </Container>
    </React.Fragment>
  );
};
