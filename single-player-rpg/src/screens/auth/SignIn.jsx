import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonLoading from '../components/ButtonLoading';

export default function SignIn({
  style, data, set, send, setScreen, loading,
}) {
  const {
    email, emailError, password, passwordError,
  } = data;
  return (
    <>
      <Typography variant="h4" component="h1" className={style.typography}>
        Sign In
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
        <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => set({ ...data, password: e.target.value })}
          onFocus={() => set({ ...data, passwordError: false })}
          error={passwordError}
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
        Sign In
      </ButtonLoading>
      <ButtonLoading
        fullWidth
        variant="contained"
        size="small"
        color="default"
        className={style.button}
        onClick={() => setScreen('forgotpassword')}
        loading={loading}
        disabled={loading}
      >
        Forgot Password?
      </ButtonLoading>
    </>
  );
}
