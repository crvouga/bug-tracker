import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { ISocialSignInProvider } from "../contracts";

const idToSrc: { [key: string]: string } = {
  google: "/google-logo.webp",
  github: "/github-logo.webp",
};

const useStyles = makeStyles((theme) => ({
  root: {
    border: `${theme.spacing(1 / 4)}px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
  },
}));

export const SocialSignInButton = ({
  provider,
  onClick,
}: {
  provider: ISocialSignInProvider;
  onClick?: () => void;
}) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.root} button divider onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          variant="rounded"
          alt={provider.name}
          src={idToSrc[provider.id]}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ variant: "h6" }}
        primary={`Sign in with ${provider.name}`}
      />
    </ListItem>
  );
};
