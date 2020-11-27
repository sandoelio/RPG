import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonLoading from '../components/ButtonLoading';

export default function SignUp({
  style, data, set, send, loading,
}) {
  const {
    name,
    nameError,
    email,
    emailError,
    password,
    passwordError,
    repeatPassword,
    repeatPasswordError,
  } = data;
  return (
    <>
      <Typography variant="h4" component="h1" className={style.typography}>
        Sign Up
      </Typography>
      <form noValidate autoComplete="off" className={style.form}>
        <TextField
          id="name"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => set({ ...data, name: e.target.value })}
          onFocus={() => set({ ...data, nameError: false })}
          error={nameError}
        />
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
        loading={loading}
        disabled={loading}
      >
        Sign Up
      </ButtonLoading>
    </>
  );
}
