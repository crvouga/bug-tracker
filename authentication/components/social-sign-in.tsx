import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

type ISocialSignInProvider = "google" | "github";

const providerToImage: { [key in ISocialSignInProvider]: string } = {
  google: "/google-logo.webp",
  github: "/github-logo.webp",
};

const providerToName: { [key in ISocialSignInProvider]: string } = {
  google: "Google",
  github: "Github",
};

export const SocialSignInButton = ({
  provider,
}: {
  provider: ISocialSignInProvider;
}) => {
  return (
    <ListItem button divider>
      <ListItemAvatar>
        <Avatar variant="rounded" src={providerToImage[provider]} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ variant: "h6" }}
        primary={`Sign in with ${providerToName[provider]}`}
      />
    </ListItem>
  );
};
