import React from "react";
import { Container } from "@material-ui/core";
import { motion } from "framer-motion";

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

export const Layout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <Container maxWidth="lg">
      <motion.div initial="initial" animate="in" exit="out" variants={variants}>
        {children}
      </motion.div>
    </Container>
  );
};
