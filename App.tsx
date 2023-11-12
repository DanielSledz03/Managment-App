import LoginForm from '@/forms/Login/LoginForm';
import React from 'react';
import { SafeAreaView } from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm />
    </SafeAreaView>
  );
}

export default App;
