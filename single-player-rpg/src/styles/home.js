import { grey } from '@material-ui/core/colors';

const styles = (theme) => ({
  container: {
    height: '100%',
    backgroundColor: grey[50],
  },
  paper: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  menuTitle: {
    flexGrow: 1,
  },
});

export default styles;
