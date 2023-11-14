import LoginForm from '@/forms/Login/LoginForm';
import Dashboard from '@/screens/Dashboard/Dashboard';
import { RootState } from '@/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '@/constants/colors';
import { TabNavigationOptions } from './TabNavigation.options';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return <LoginForm />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={TabNavigationOptions}>
        <Tab.Screen name='Dashboard' component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
