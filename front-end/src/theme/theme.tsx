import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
    primaryDrawer: {
      width: number;
      closed: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    primaryAppBar?: {
      height?: number;
    };

    primaryDrawer?: {
      width?: number;
      closed?: number;
    };
  }
}

const createMuiTheme = () => {
  const theme = createTheme({
    primaryAppBar: {
      height: 50,
    },
    primaryDrawer: {
      width: 240,
      closed: 70,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });
  return responsiveFontSizes(theme);
};

export default createMuiTheme;
