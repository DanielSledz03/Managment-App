import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '@constants/colors'; // Assuming this is your color constants file

type IconType = 'Entypo' | 'Octicons' | 'MaterialCommunityIcons' | 'FontAwesome6';

interface TabItemProps {
  name: string;
  label: string;
  iconType: IconType;
}

export const TabBar = ({ navigation }: BottomTabBarProps) => {
  const focusedScreen = navigation.getState().routeNames[navigation.getState().index];

  const handlePress = (name: string) => {
    navigation.navigate(name);
  };

  const renderIcon = (label: string, name: string, type: IconType) => {
    const icons = {
      Entypo: <Entypo name={name} size={30} color={getIconColor(label)} />,
      Octicons: <Octicons name={name} size={28} color={getIconColor(label)} />,
      MaterialCommunityIcons: (
        <MaterialCommunityIcons name={name} size={36} color={getIconColor(label)} />
      ),

      FontAwesome6: <FontAwesome6 name={name} size={30} color={getIconColor(label)} />,
    };
    return icons[type];
  };

  const getIconColor = (name: string) =>
    focusedScreen === name ? colors.orangeBright : colors.white;

  const TabItem = ({ name, label, iconType }: TabItemProps) => (
    <TouchableOpacity onPress={() => handlePress(label)} style={styles.container}>
      {renderIcon(label, name, iconType)}
      <Text style={[styles.text, { color: getIconColor(label) }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bottombar}>
      <TabItem name='home' label='Dashboard' iconType='Entypo' />
      <TabItem name='checklist' label='Zadania' iconType='Octicons' />
      <TabItem name='calendar-days' label='Grafik' iconType='FontAwesome6' />
      <TabItem name='text-account' label='Konto' iconType='MaterialCommunityIcons' />
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
