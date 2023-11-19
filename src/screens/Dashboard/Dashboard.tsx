import GradientText from '@/components/GradientText/GradientText';
import StartWorkButton from '@/components/StartWorkButton/StartWorkButton';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@constants/colors';
import HeaderBar from '@view/HeaderBar/HeaderBar';
import { InfoCard } from '@components/InfoCard/InfoCard';
import { TaskCard } from '@components/TaskCard/TaskCard';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollView style={styles.container}>
      <HeaderBar />
      <Text style={styles.date}>{today}</Text>
      <GradientText style={styles.heading}>Dzień dobry Julia!</GradientText>

      <StartWorkButton />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 20,
          marginBottom: 15,
        }}
      >
        <InfoCard title='Przypisane zadania' value={'11'} />
        <InfoCard title='Twoje wynagrodzenie' value={'1445 zł'} />
      </View>

      <GradientText style={styles.heading}>Przypisane zadania</GradientText>

      <TaskCard
        taskTime='4 minuty temu'
        priority
        title='Przygotuj magazyn na jutrzejszą dostawę.'
      />

      <TaskCard taskTime='8 minuty temu' title='Przygotuj magazyn na jutrzejszą dostawę.' />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
    marginBottom: 90,
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
