import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {getCurrentUser} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';

type UserType = null | undefined;

type AuthContextType = {
  userAuth: UserType;
  userId: string;
  loadingAuth: boolean;
  //jwtToken: string | null;
};

const AuthContext = createContext<AuthContextType>({
  userAuth: undefined,
  userId: '' || undefined,
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [userAuth, setUser] = useState<UserType>(undefined);
  const [loadingAuth, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const authUser = await getCurrentUser();
      setUser(authUser);
    } catch (e) {
      setUser(null);
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
        case 'signedIn':
          // Handle sign in event
          console.log('User signed in:', data);
          checkUser();
          break;
        case 'signedOut':
          // Handle sign out event
          console.log('User signed out:', data);
          setUser(null);
          break; // Add break statement here
        default:
          break;
      }
    });
    return () => {
      authListener(); // Call the returned function to unsubscribe from the event
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{userAuth, loadingAuth, userId: userAuth?.userId}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
