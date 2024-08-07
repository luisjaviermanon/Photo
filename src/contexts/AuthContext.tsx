import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Hub} from 'aws-amplify/utils';
import {
  getCurrentUser,
  fetchAuthSession,
  signOut as amplifySignOut,
} from '@aws-amplify/auth';
import {HubCallback} from '@aws-amplify/core';

type UserType = {
  username: string;
  userId: string;
  signInDetails?: any;
} | null;

type AuthContextType = {
  user: UserType;
  userId: string;
  setUser: Dispatch<SetStateAction<UserType>>;
  handleSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userId: '',
  setUser: () => {},
  handleSignOut: async () => {},
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>(null);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const {username, userId} = currentUser;
      setUser({username, userId});
    } catch (e) {
      setUser(null);
    }
  };
  const checkSession = async () => {
    try {
      const session = await fetchAuthSession({forceRefresh: true});
      const {accessToken, idToken} = session.tokens ?? {};
      console.log({accessToken, idToken});
    } catch (err) {
      console.log('este es el error', err);
    }
  };
  const handleSignOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  useEffect(() => {
    checkUser();
    checkSession();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setUser(null);
      }

      if (event === 'signIn') {
        checkUser();
      }
    };
    const hubSubscription = Hub.listen('auth', listener);
    return () => {
      hubSubscription();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{user, userId: user?.userId ?? '', setUser, handleSignOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
