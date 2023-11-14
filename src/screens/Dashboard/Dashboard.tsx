import GradientText from '@/components/GradientText/GradientText';
import StartWorkButton from '@/components/StartWorkButton/StartWorkButton';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@constants/colors';
import HeaderBar from '@view/HeaderBar/HeaderBar';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <HeaderBar />
      <Text style={styles.date}>{today}</Text>

      <GradientText style={styles.heading}>Dzień dobry Julia!</GradientText>

      <StartWorkButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
  },

  heading: {
    fontSize: 34,
    color: colors.white,
    marginBottom: 20,
    fontFamily: 'Jost-SemiBold',
  },

  date: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Jost-Regular',
  },
});

export default Dashboard;
