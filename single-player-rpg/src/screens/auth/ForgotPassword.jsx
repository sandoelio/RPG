import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonLoading from '../components/ButtonLoading';

export default function ForgotPassword({
  style, data, set, send, setScreen, loading,
}) {
  const { email, emailError } = data;
  return (
    <>
      <Typography variant="h4" component="h1" className={style.typography}>
        Forgot Password
      </Typography>
      <Typography className={style.typography}>
        Please type  youy email to receive the code
      </Typography>
      <form noValidate autoComplete="off" className={style.form}>
        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => set({ ...data, email: e.target.value })}
          onFocus={() => set({ ...data, emailError: false })}
          error={emailError}
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
        Send
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
