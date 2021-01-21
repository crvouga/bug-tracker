import { Box, CircularProgress } from "@material-ui/core";
import Image from "next/image";
import { AnimationLayout } from "./layout";

export const Loading = () => {
  return (
    <AnimationLayout>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image width="240px" height="240px" src="/logo-dark.svg" />
        <CircularProgress />
      </Box>
    </AnimationLayout>
  );
};
