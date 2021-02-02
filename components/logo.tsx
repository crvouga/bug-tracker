import Avatar, { AvatarProps } from "@material-ui/core/Avatar";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Image from "next/image";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
  },
}));

export const LogoAvatar = (props: AvatarProps) => {
  const classes = useStyles();
  return (
    <Avatar className={clsx(classes.root, props.className)} {...props}>
      <Image layout="fill" alt="bug tracker logo" src={"/logo-dark.svg"} />
    </Avatar>
  );
};

export const LogoListItem = (props: ListItemProps) => {
  return (
    //@ts-ignore
    <ListItem {...props}>
      <ListItemAvatar>
        <LogoAvatar />
      </ListItemAvatar>
      <ListItemText primary="Bug Tracker" />
    </ListItem>
  );
};
