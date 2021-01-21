import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

const idToSrc: { [key: string]: string } = {
  google: "/google-logo.webp",
  github: "/github-logo.webp",
};

export const SocialSignInButton = ({
  provider,
  onClick,
}: {
  provider: {
    id: string;
    name: string;
  };
  onClick?: () => void;
}) => {
  return (
    <ListItem button divider onClick={onClick}>
      <ListItemAvatar>
        <Avatar variant="rounded" src={idToSrc[provider.id]} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ variant: "h6" }}
        primary={`Sign in with ${provider.name}`}
      />
    </ListItem>
  );
};
