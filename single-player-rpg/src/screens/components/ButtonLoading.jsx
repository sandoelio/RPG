import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  spinner: {
    marginLeft: 15,
  },
};

const SpinnerAdornment = withStyles(styles)((props) => (
  <CircularProgress
    className={props.classes.spinner}
    size={20}
  />
));

const ButtonLoading = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props;
  return (
    <Button {...rest}>
      {children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  );
};

export default ButtonLoading;
