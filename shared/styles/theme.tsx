import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// Create a theme instance.
let theme = createMuiTheme({
  palette: {
    text: {
      primary: "#000000",
      secondary: "#BEBEBE"
      // disabled: "",
      // hint: ""
    },
    primary: {
      light: "#93CEA8",
      main: "#4FA9A1",
      dark: "#396981",
      contrastText: "#fff"
    },
    secondary: {
      light: "#8eacbb",
      main: "#A94F57",
      dark: "#815139",
      contrastText: "#000"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
