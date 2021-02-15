import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "next/image";
import { AnimationLayout } from "./layout.page";

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
