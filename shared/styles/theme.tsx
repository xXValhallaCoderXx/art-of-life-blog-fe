import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Create a theme instance.
let theme = createMuiTheme({
  palette: {
    text: {
      primary: "#666666",
      secondary: "#999999",
      // disabled: "",
      // hint: ""
    },
    primary: {
      light: "#93CEA8",
      main: "#4FA9A1",
      dark: "#396981",
      contrastText: "#fff",
    },
    secondary: {
      light: "#CCCCCC",
      main: "#999999",
      dark: "#666666",
      contrastText: "#000",
    },

    background: {
      default: "#fff",
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
