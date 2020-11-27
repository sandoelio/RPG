import React, { createContext, useReducer } from 'react';

const intialState = {
  user: {
    id: null,
    name: '',
    email: '',
    avatar: '',
  },
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, user: action.payload };
    }
    case 'UNSET_USER': {
      return { ...state, user: intialState };
    }
    default: {
      return state;
    }
  }
};

export const UserContext = createContext({
  state: intialState,
  dispatch: () => null,
});

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, intialState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
