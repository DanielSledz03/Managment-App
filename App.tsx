import LoginForm from '@/forms/Login/LoginForm';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { AppState, AppStateStatus, Platform, SafeAreaView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from '@/store';
import Dashboard from '@/screens/Dashboard';
import TabNavigation from '@/navigation/TabNavigation';

const queryClient = new QueryClient();

function App(): JSX.Element {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <TabNavigation />
        </SafeAreaView>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
