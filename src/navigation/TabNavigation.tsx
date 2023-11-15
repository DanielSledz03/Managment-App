import LoginForm from '@/forms/Login/LoginForm';
import Dashboard from '@/screens/Dashboard/Dashboard';
import { RootState } from '@/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { TabNavigationOptions } from './TabNavigation.options';
import { TabBar } from './TabBar/TabBar';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return <LoginForm />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Dashboard'
        screenOptions={TabNavigationOptions}
        tabBar={TabBar}
      >
        <Tab.Screen name='Dashboard' component={Dashboard} />
        <Tab.Screen name='Tasks' component={Dashboard} />
        <Tab.Screen name='WorkSchedule' component={Dashboard} />
        <Tab.Screen name='Account' component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
