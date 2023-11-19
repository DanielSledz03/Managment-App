import GradientText from '@/components/GradientText/GradientText';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '@constants/colors';

const WorkSchedule = () => {
  return (
    <ScrollView style={styles.container}>
      <GradientText style={styles.heading}>Grafik</GradientText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
    marginBottom: 90,
    paddingTop: 30,
  },

  heading: {
    width: '100%',
    textAlign: 'center',
    fontSize: 34,
    color: colors.white,
    marginBottom: 30,
    fontFamily: 'Jost-SemiBold',
  },

  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default WorkSchedule;
