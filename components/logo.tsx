import { Avatar, AvatarProps, makeStyles } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";

export const LogoIcon = BugReportIcon;

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "inherit",
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

export const LogoAvatar = (props: AvatarProps) => {
  const classes = useStyles();
  return <Avatar className={classes.large} src={"/logo-dark.svg"} {...props} />;
};
