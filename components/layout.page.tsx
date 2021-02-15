import { motion } from "framer-motion";
import Head from "next/Head";
import React from "react";

type ILayoutPageProps = React.PropsWithChildren<{
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

export const LayoutPage = (props: ILayoutPageProps) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Head>
        <title>
          {props.title ? `${props.title} | Bug Tracker` : "Bug Tracker"}
        </title>
      </Head>
      <AnimationLayout>{children}</AnimationLayout>
    </React.Fragment>
  );
};
