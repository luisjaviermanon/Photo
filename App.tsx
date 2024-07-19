import React from 'react';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import Navigation from './src/navigation';
import AuthProvider from './src/contexts/AuthContext';

Amplify.configure(config);
const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
