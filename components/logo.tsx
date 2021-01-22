import Avatar, { AvatarProps } from "@material-ui/core/Avatar";
import Image from "next/image";

export const LogoAvatar = (props: AvatarProps) => {
  return (
    <Avatar {...props}>
      <Image layout="fill" alt="logo" src={"/logo-dark.svg"} />
    </Avatar>
  );
};
