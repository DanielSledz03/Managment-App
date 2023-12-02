import HomeColored from '../../assets/icons/bottomBar/colored/home.svg';
import ScheduleColored from '../../assets/icons/bottomBar/colored/schedule.svg';
import TasksColored from '../../assets/icons/bottomBar/colored/tasks.svg';
import UserColored from '../../assets/icons/bottomBar/colored/user.svg';
import Task from '../../assets/icons/bottomBar/home.svg';
import Home from '../../assets/icons/bottomBar/schedule.svg';
import Schedule from '../../assets/icons/bottomBar/tasks.svg';
import User from '../../assets/icons/bottomBar/user.svg';
import { colors } from '@constants/colors'; // Assuming this is your color constants file
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabItemProps {
  label: string;
  routeName: string;
  iconName: ReactNode;
  coloredIconName: ReactNode;
}

export const TabBar = ({ navigation }: BottomTabBarProps) => {
  const focusedScreen = navigation.getState().routeNames[navigation.getState().index];

  const handlePress = (name: string) => {
    navigation.navigate(name);
  };

  const getIconColor = (name: string) =>
    focusedScreen === name ? colors.orangeBright : colors.white;

  const TabItem = ({ label, routeName, iconName, coloredIconName }: TabItemProps) => (
    <TouchableOpacity onPress={() => handlePress(routeName)} style={styles.container}>
      {focusedScreen === routeName ? coloredIconName : iconName}
      <Text style={[styles.text, { color: getIconColor(routeName) }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bottombar}>
      <TabItem
        label='Dashboard'
        routeName='Dashboard'
        iconName={<Home />}
        coloredIconName={<HomeColored />}
      />
      <TabItem
        label='Zadania'
        routeName='Tasks'
        iconName={<Task />}
        coloredIconName={<TasksColored />}
      />
      <TabItem
        label='Grafik'
        routeName='WorkSchedule'
        iconName={<Schedule />}
        coloredIconName={<ScheduleColored />}
      />
      <TabItem
        label='Konto'
        routeName='Account'
        iconName={<User />}
        coloredIconName={<UserColored />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottombar: {
    borderTopWidth: 1,
    borderTopColor: colors.white,
    height: 90,
    backgroundColor: colors.greyDark2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
    zIndex: 8,
  },
  container: {
    width: '25%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Jost-SemiBold',
    fontSize: 12,
    marginTop: 5,
  },
});
