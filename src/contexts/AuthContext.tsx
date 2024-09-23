import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {Hub} from 'aws-amplify/utils';
import {getCurrentUser} from '@aws-amplify/auth';
import {HubCallback} from '@aws-amplify/core';

type UserType = {
  username: string;
} | null;

type AuthContextType = {
  user: UserType;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>(null);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const {username} = currentUser;
      setUser({username});
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      if (event === 'signedOut') {
        setUser(null);
      }

      if (event === 'signedIn') {
        checkUser();
      }
      console.log(event);
    };
    const hubSubscription = Hub.listen('auth', listener);
    return () => {
      hubSubscription();
    };
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
