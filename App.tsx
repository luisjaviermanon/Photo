import React from 'react';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import Navigation from './src/navigation';
import AuthProvider from './src/contexts/AuthContext';
import Client from './src/apollo/Client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Client>
          <Navigation />
        </Client>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
