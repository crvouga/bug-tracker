import MuiAvatar, { AvatarProps } from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton, { SkeletonProps } from "@material-ui/lab/Skeleton";
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

export const AvatarSkeleton = (props: SkeletonProps) => {
  return (
    <Skeleton variant="circle" {...props}>
      <MuiAvatar alt="loading" />
    </Skeleton>
  );
};
