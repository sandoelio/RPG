import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { UserContext } from '../context/UserContext';
import styles from '../styles/home';

export default function Home() {
  const [{ user }] = useContext(UserContext);

  const theme = useTheme();
  const useStyles = makeStyles(styles(theme));
  const style = useStyles();
  const [userMenuEl, setUserMenuEl] = useState(null);
  const open = Boolean(userMenuEl);

  const handleUserMenu = (event) => {
    setUserMenuEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuEl(null);
  };

  return (
    <Container component="main" maxWidth="sm" className={style.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={style.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={style.menuTitle}>
            Home
          </Typography>
          {user && (
          <>
            <IconButton
              aria-label="user account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserMenu}
              color="inherit"
            >
              <Avatar alt={user.name} src={`avatars/${user.avatar}`} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={userMenuEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => Auth.signOut()}
              >
                Sign Out
              </MenuItem>
            </Menu>
          </>
          )}
        </Toolbar>
      </AppBar>
      <Paper className={style.paper}>
        <Typography variant="h6" className={style.menuTitle}>
          Welcome
          {' '}
          {user.name}
        </Typography>
      </Paper>
    </Container>
  );
}
