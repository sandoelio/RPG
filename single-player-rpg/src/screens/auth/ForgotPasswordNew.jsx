import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonLoading from '../components/ButtonLoading';

export default function ForgotPasswordNew({
  style, data, set, send, setScreen, loading,
}) {
  const {
    code,
    codeError,
    password,
    passwordError,
    repeatPassword,
    repeatPasswordError,
  } = data;
  return (
    <>
      <Typography variant="h4" component="h1" className={style.typography}>
        Set New Password
      </Typography>
      <Typography className={style.typography}>
        Check  your email, type the code, and set a new password
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
        <TextField
          id="repeatpassword"
          label="Repeat Password"
          type="password"
          fullWidth
          value={repeatPassword}
          onChange={(e) => set({ ...data, repeatPassword: e.target.value })}
          onFocus={() => set({ ...data, repeatPasswordError: false })}
          error={repeatPasswordError}
        />
      </form>
      <ButtonLoading
        fullWidth
        variant="contained"
        color="primary"
        className={style.button}
        onClick={() => send()}
      >
        Set New Password
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
