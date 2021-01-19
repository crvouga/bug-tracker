import { CssBaseline } from "@material-ui/core";
import {
  createMuiTheme,
  MuiThemeProvider,
  ThemeOptions,
} from "@material-ui/core/styles";
import { PropsWithChildren } from "react";

const themeOptions: ThemeOptions = {
  typography: {
    fontWeightRegular: "bold",
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          scrollBehavior: "smooth",
        },
      },
    },
  },
};

export const createTheme = () => {
  return createMuiTheme(themeOptions);
};

type IThemeProviderProps = PropsWithChildren<{}>;

export const ThemeProvider = (props: IThemeProviderProps) => {
  const { children } = props;
  const theme = createTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
