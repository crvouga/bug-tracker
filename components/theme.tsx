import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  MuiThemeProvider,
  ThemeOptions,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { PropsWithChildren } from "react";

const themeOptions: ThemeOptions = {
  palette: {
    type: "dark",
  },
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
  return responsiveFontSizes(createMuiTheme(themeOptions));
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
