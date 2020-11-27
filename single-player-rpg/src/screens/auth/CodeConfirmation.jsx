import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonLoading from '../components/ButtonLoading';

export default function CodeConfirmation({
  style, data, set, send, setScreen, loading,
}) {
  const { code, codeError } = data;
  return (
    <>
      <Typography variant="h4" component="h1" className={style.typography}>
        Code Confirmation
      </Typography>
      <Typography className={style.typography}>
        Check  your email and type the code
      </Typography>
      <form noValidate autoComplete="off" className={style.form}>
        <TextField
          id="code"
          label="Code"
          type="number"
          fullWidth
          value={code}
          onChange={(e) => set({ ...data, code: e.target.value })}
          onFocus={() => set({ ...data, codeError: false })}
          error={codeError}
        />
      </form>
      <ButtonLoading
        fullWidth
        variant="contained"
        color="primary"
        className={style.button}
        onClick={() => send()}
        loading={loading}
        disabled={loading}
      >
        Confirm
      </ButtonLoading>
      <ButtonLoading
        fullWidth
        variant="contained"
        size="small"
        color="default"
        className={style.button}
        onClick={() => setScreen('signin')}
        loading={loading}
        disabled={loading}
      >
        Back
      </ButtonLoading>
    </>
  );
}
