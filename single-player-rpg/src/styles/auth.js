import { common, grey } from '@material-ui/core/colors';

const styles = (theme) => ({
  container: {
    height: '100%',
    backgroundColor: grey[50],
    padding: theme.spacing(2),
  },
  paper: {
    flexGrow: 1,
  },
  tab: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    backgroundColor: common.white,
  },
  typography: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  form: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    marginTop: theme.spacing(3),
  },
});

export default styles;
