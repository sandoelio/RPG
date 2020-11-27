import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as auth from '../utils/auth';
import styles from '../styles/auth';
import ErrorMsg from './ErrorMsg';
import {
  SignIn, SignUp, ForgotPassword, CodeConfirmation, ForgotPasswordNew,
} from './auth';

export default function Auth() {
  const theme = useTheme();
  const useStyles = makeStyles(styles(theme));
  const style = useStyles();

  const [tab, setTab] = useState(0);
  const [screen, setScreen] = useState('signin');
  const handleChangeTab = (e, t) => setTab(t);

  useEffect(() => {
    if (tab === 0) setScreen('signin');
    if (tab === 1) setScreen('signup');
  }, [tab]);

  const [error, setError] = useState({
    open: false,
    msg: {
      title: '',
      desc: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const [signUp, setSignUp] = useState({
    name: '',
    nameError: false,
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
    repeatPassword: '',
    repeatPasswordError: false,
  });

  const [codeConfirmation, setCodeConfirmation] = useState({
    code: '',
    codeError: false,
  });

  const [signIn, setSignIn] = useState({
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
  });

  const [forgotPassword, setForgotPassword] = useState({
    email: '',
    emailError: false,
  });

  const [forgotPasswordNew, setForgotPasswordNew] = useState({
    code: '',
    codeError: false,
    password: '',
    passwordError: false,
    repeatPassword: '',
    repeatPasswordError: false,
  });

  function validateEmail(e) {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!e.match(mailformat)) return false;
    return true;
  }

  function validateSignUp() {
    let signUpClone = { ...signUp };
    Object.keys(signUp).forEach((k) => {
      if (!k.includes('Error') && !signUp[k]) signUpClone = { ...signUpClone, [`${k}Error`]: true };
    });
    setSignUp(signUpClone);
    if (Object.values(signUpClone).find((d) => d === true)) return false;
    if (!validateEmail(signUp.email)) {
      setSignUp({ ...signUpClone, emailError: true });
      return false;
    }
    if (signUp.password !== signUp.repeatPassword) {
      setSignUp({ ...signUpClone, passwordError: true, repeatPasswordError: true });
      return false;
    }
    return true;
  }

  async function handleSignUp() {
    if (!validateSignUp()) return;
    try {
      setLoading(true);
      const { email, password, name } = signUp;
      await auth.signUp(email, password, name);
      setLoading(false);
      setScreen('codeconfirmation');
    } catch (err) {
      setLoading(false);
      setError({ open: true, msg: { title: 'Error', desc: err.message } });
    }
  }

  async function handleCodeConfirmation() {
    if (!codeConfirmation.code) {
      setCodeConfirmation({ ...codeConfirmation, codeError: true });
      return;
    }
    try {
      setLoading(true);
      await auth.confirmSignUp(signUp.email, codeConfirmation.code);
      setLoading(false);
      setTab(0);
    } catch (err) {
      setLoading(false);
      setError({ open: true, msg: { title: 'Error', desc: err.message } });
    }
  }

  async function handleSignIn() {
    let signInClone = { ...signIn };
    Object.keys(signIn).forEach((k) => {
      if (!k.includes('Error') && !signIn[k]) signInClone = { ...signInClone, [`${k}Error`]: true };
    });
    setSignIn(signInClone);
    if (Object.values(signInClone).find((d) => d === true)) return;
    if (!validateEmail(signIn.email)) {
      setSignIn({ ...signInClone, emailError: true });
      return;
    }
    try {
      setLoading(true);
      await auth.signIn(signIn.email, signIn.password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError({ open: true, msg: { title: 'Error', desc: err.message } });
    }
  }

  async function handleForgotPassword() {
    if (!forgotPassword.email || !validateEmail(forgotPassword.email)) {
      setForgotPassword({ ...forgotPassword, emailError: true });
      return;
    }
    try {
      setLoading(true);
      await auth.forgotPassword(forgotPassword.email);
      setLoading(false);
      setScreen('forgotpasswordnew');
    } catch (err) {
      setLoading(false);
      setError({ open: true, msg: { title: 'Error', desc: err.message } });
    }
  }

  async function handleForgotPasswordNew() {
    let fPNewClone = { ...forgotPasswordNew };
    Object.keys(forgotPasswordNew).forEach((k) => {
      if (!k.includes('Error') && !forgotPasswordNew[k]) fPNewClone = { ...fPNewClone, [`${k}Error`]: true };
    });
    setForgotPasswordNew(fPNewClone);
    if (Object.values(fPNewClone).find((d) => d === true)) return;
    if (forgotPasswordNew.password !== forgotPasswordNew.repeatPassword) {
      setForgotPasswordNew({ ...fPNewClone, passwordError: true, repeatPasswordError: true });
      return;
    }
    try {
      setLoading(true);
      const { code, password } = forgotPasswordNew;
      await auth.forgotPasswordSubmit(forgotPassword.email, code, password);
      setLoading(false);
      setScreen('signin');
    } catch (err) {
      setLoading(false);
      setError({ open: true, msg: { title: 'Error', desc: err.message } });
    }
  }

  return (
    <Container component="main" maxWidth="sm" className={style.container}>
      <Paper className={style.paper}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
      </Paper>
      {tab === 0 && (
      <Box m={2} p={2} className={style.box}>
        {screen === 'signin' && (
          <SignIn
            style={style}
            loading={loading}
            data={signIn}
            set={setSignIn}
            send={handleSignIn}
            setScreen={setScreen}
          />
        )}
        {screen === 'forgotpassword' && (
          <ForgotPassword
            style={style}
            loading={loading}
            data={forgotPassword}
            set={setForgotPassword}
            send={handleForgotPassword}
            setScreen={setScreen}
          />
        )}
        {screen === 'forgotpasswordnew' && (
          <ForgotPasswordNew
            style={style}
            loading={loading}
            data={forgotPasswordNew}
            set={setForgotPasswordNew}
            send={handleForgotPasswordNew}
            setScreen={setScreen}
          />
        )}
      </Box>
      )}
      {tab === 1 && (
      <Box m={2} p={2} className={style.box}>
        {screen === 'signup' && (
          <SignUp
            style={style}
            loading={loading}
            data={signUp}
            set={setSignUp}
            send={handleSignUp}
            setScreen={setScreen}
          />
        )}
        {screen === 'codeconfirmation' && (
          <CodeConfirmation
            style={style}
            loading={loading}
            data={codeConfirmation}
            set={setCodeConfirmation}
            send={handleCodeConfirmation}
            setScreen={setScreen}
          />
        )}
      </Box>
      )}
      <ErrorMsg error={error} setOpen={setError} />
    </Container>
  );
}
