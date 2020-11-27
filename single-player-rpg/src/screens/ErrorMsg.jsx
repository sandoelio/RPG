import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ErrorMsg({ error, setOpen }) {
  const theme = useTheme();
  const useStyles = makeStyles({
    error: {
      color: theme.palette.error.main,
    },
  });
  const style = useStyles();

  return (
    <Dialog
      open={error.open}
      onClose={() => setOpen({ ...error, open: false })}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" className={style.error}>
        Error:
        {' '}
        {error.msg.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {error.msg.desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={style.error}
          onClick={() => setOpen({ ...error, open: false })}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
