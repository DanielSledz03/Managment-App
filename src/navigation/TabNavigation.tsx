import { TabBar } from './TabBar/TabBar';
import { TabNavigationOptions } from './TabNavigation.options';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AuthSliceActions } from '@store/Auth/Auth.reducer';
import refreshTokenAPI from '@utils/refreshToken';
import verifyTokenAPI from '@utils/verifyToken';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '@/forms/Login/LoginForm';
import Account from '@/screens/Account';
import Dashboard from '@/screens/Dashboard';
import Tasks from '@/screens/Tasks';
import WorkSchedule from '@/screens/WorkSchedule';
import { RootState } from '@/store';

export type RootStackParamList = {
  Dashboard: undefined; // Brak parametrów dla ekranu Dashboard
  Tasks: undefined; // Ekran Tasks przyjmuje parametr `taskId`
  WorkSchedule: undefined; // Brak parametrów dla WorkSchedule
  Account: { userId: string }; // Ekran Account przyjmuje parametr `userId`
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabNavigation() {
  const { accessToken, refreshToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const refreshTokenFunc = useCallback(() => {
    if (refreshToken) {
      refreshTokenAPI(refreshToken)
        .then((newAccessToken) => {
          dispatch(AuthSliceActions.setAccessToken(newAccessToken));
          AsyncStorage.setItem('access_token', JSON.stringify(newAccessToken));
        })
        .catch((error) => console.error('Error refreshing token:', error));
    }
  }, [refreshToken]);

  const verifyTokenFunc = useCallback(() => {
    if (!refreshToken) return;
    verifyTokenAPI(refreshToken)
      .then((isValid) => {
        if (isValid) {
          refreshTokenFunc();
        } else {
          dispatch(AuthSliceActions.setAccessToken(null));
          dispatch(AuthSliceActions.setRefreshToken(null));
          AsyncStorage.removeItem('access_token');
          AsyncStorage.removeItem('refresh_token');
          Alert.alert('Session expired', 'Please log in again.');
        }
      })
      .catch((error) => console.error('Error verifying token:', error));
  }, [refreshToken]);

  const fetchRefreshToken = async () => {
    try {
      const storedRefreshToken = await AsyncStorage.getItem('refresh_token');
      if (storedRefreshToken) {
        dispatch(AuthSliceActions.setRefreshToken(JSON.parse(storedRefreshToken)));
      }
    } catch (error) {
      console.error('Error fetching refresh token:', error);
    }
  };

  useEffect(() => {
    fetchRefreshToken();
    verifyTokenFunc();
    if (refreshToken) {
      const newIntervalId = setInterval(verifyTokenFunc, 3000000);
      setIntervalId(newIntervalId);
    }

    return () => intervalId && clearInterval(intervalId);
  }, [accessToken, refreshToken, verifyTokenFunc, refreshTokenFunc]);

  if (!accessToken) return <LoginForm />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Dashboard'
        screenOptions={TabNavigationOptions}
        tabBar={TabBar}
      >
        <Tab.Screen name='Dashboard' component={Dashboard} />
        <Tab.Screen name='Tasks' component={Tasks} />
        <Tab.Screen name='WorkSchedule' component={WorkSchedule} />
        <Tab.Screen name='Account' component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
