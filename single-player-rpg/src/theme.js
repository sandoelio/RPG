import {
  teal, orange, red, blueGrey,
} from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: orange[500],
    },
    error: {
      main: red[500],
    },
    background: {
      default: blueGrey[100],
    },
  },
});

export default responsiveFontSizes(theme);
