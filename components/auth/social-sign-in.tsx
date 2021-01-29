import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Avatar } from "../avatar";

const idToSrc: { [key: string]: string } = {
  google: "/google-logo.webp",
  github: "/github-logo.webp",
  email: "/email-icon.png",
};

const useStyles = makeStyles((theme) => ({
  root: {
    border: `${theme.spacing(1 / 3)}px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
  },
}));

export const SocialSignInButton = ({
  provider,
  onClick,
}: {
  provider: { name: string; id: string };
  onClick?: () => void;
}) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.root} button divider onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          variant="rounded"
          src={idToSrc[provider.id]}
          alt={provider.name}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          variant: "h6",
          style: { fontWeight: "bold" },
        }}
        primary={`Sign in with ${provider.name}`}
      />
    </ListItem>
  );
};
