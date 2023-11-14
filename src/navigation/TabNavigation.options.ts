import colors from '@/constants/colors';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export const TabNavigationOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
  },
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: colors.white,
    height: '11%',
    backgroundColor: colors.greyDark2,
    paddingBottom: 10,
    justifyContent: 'space-between',

    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
    zIndex: 8,
  },
  tabBarItemStyle: {
    justifyContent: 'space-around',
  },

  tabBarInactiveTintColor: '#8C8C8C',

  tabBarLabelPosition: 'below-icon',
};
