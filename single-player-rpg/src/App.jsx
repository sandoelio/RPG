import React, {
  useState, lazy, Suspense, useEffect, useContext,
} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Hub } from 'aws-amplify';
import { UserContext } from './context/UserContext';
import { currentUserInfo } from './utils/auth';

const Auth = lazy(() => import('./screens/Auth'));
const Home = lazy(() => import('./screens/Home'));
const NotFound = lazy(() => import('./screens/NotFound'));

export default function App() {
  const [state, dispatch] = useContext(UserContext);
  const [authInit, setAuthInit] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await currentUserInfo();
        /**
       * Icon made by Darius Dan from flaticon
       * https://www.flaticon.com/authors/darius-dan
       */
        const formatUser = {
          id: currentUser.attributes.sub,
          name: currentUser.attributes.given_name,
          email: currentUser.attributes.email,
          avatar: 'axe.png',
        };
        dispatch({ type: 'SET_USER', payload: formatUser });
      } catch (err) {
        dispatch({ type: 'UNSET_USER' });
      }
      setAuthInit(false);
    }

    checkAuth();

    Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signOut') {
        setAuthInit(false);
        dispatch({ type: 'UNSET_USER' });
      } else if (payload.event === 'signIn') {
        checkAuth();
      }
    });
  }, [dispatch]);

  function Loading() {
    const lStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <main style={lStyle}>
        <CircularProgress />
      </main>
    );
  }

  if (authInit) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        {!state.user.id ? (
          <Switch>
            <Route path="/" render={() => <Auth />} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route component={NotFound} />
          </Switch>
        )}
      </BrowserRouter>
    </Suspense>
  );
}
