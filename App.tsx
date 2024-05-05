import NetInfo from '@react-native-community/netinfo';
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import TabNavigation from '@/navigation/TabNavigation';
import store from '@/store';
import Config from 'react-native-config';

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

  console.log('env', Config.HOSTNAME);

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
