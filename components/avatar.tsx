import MuiAvatar, { AvatarProps } from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import React from "react";

const useStyles = makeStyles({
  transparent: {
    backgroundColor: "transparent",
  },
});

export const Avatar = (props: AvatarProps) => {
  const classes = useStyles();

  return (
    <MuiAvatar className={props.src && classes.transparent} {...props}>
      {props.src && <Image layout="fill" src={props.src} alt={props.alt} />}
      {props.children}
    </MuiAvatar>
  );
};
