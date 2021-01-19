import { Avatar, AvatarProps } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";

export const IconLogo = BugReportIcon;

export const AvatarLogo = (props: AvatarProps) => {
  return (
    <Avatar {...props}>
      <IconLogo />
    </Avatar>
  );
};
