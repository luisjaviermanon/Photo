import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {getCurrentUser, AuthUser} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';

type UserType = {
  username: string;
  userId: string;
} | null;

type AuthContextType = {
  userAuth: UserType;
  userId: string | undefined;
  loadingAuth: boolean;
  setUser: (user: UserType) => void;
};

const AuthContext = createContext<AuthContextType>({
  userAuth: null,
  userId: undefined,
  loadingAuth: true,
  setUser: () => {},
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [userAuth, setUser] = useState<UserType>(null);
  const [loadingAuth, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const authUser = await getCurrentUser();
      if (authUser) {
        setUser({
          username: authUser.username,
          userId: authUser.attributes.sub,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const authListener = Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
          console.log('User signed in:', data);
          checkUser();
          break;
        case 'signOut':
          console.log('User signed out:', data);
          setUser(null);
          break;
        default:
          break;
      }
    });
    return () => {
      Hub.remove('auth', authListener);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{userAuth, loadingAuth, userId: userAuth?.userId, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
