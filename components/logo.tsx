import { Avatar, AvatarProps, makeStyles } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";

export const LogoIcon = BugReportIcon;

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "inherit",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const LogoAvatar = (props: AvatarProps) => {
  const classes = useStyles();
  return (
    <Avatar className={classes.avatar} {...props}>
      <LogoIcon className={classes.icon} />
    </Avatar>
  );
};
