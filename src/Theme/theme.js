import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#151E2F"
    },
    secondary: {
      main: "#AC2F32"
    },
    error: {
      main: "#dc3545"
    }
  }
});
