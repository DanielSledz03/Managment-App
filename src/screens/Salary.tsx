import { Shift } from '@/types/Shift.type';
import GradientText from '@components/GradientText/GradientText';
import { InfoCard } from '@components/InfoCard/InfoCard';
import { colors } from '@constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sumAllShifts } from '@utils/sumAllShifts';
import React, { useCallback, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { useAxios } from '@/hooks/useAxios';
import BonusBox from '@components/BonusBox/BonusBox';
import { Bonus } from '@/types/Bonus.type';
import { InfoCardAsync } from '@components/InfoCard/InfoCardAsync';
import BonusesAndPenalties from '@view/BonusesAndPenalties/BonusesAndPenalties';
import { Penalty } from '@/types/Penalty.type';

interface SalaryScreenProps {
  navigation: NavigationProp<SalaryScreenProps>;
}

interface MonthlyShifts {
  minutes: number;
  seconds: number;
  hours: number;
}

const SalaryScreen: React.FC<SalaryScreenProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const axios = useAxios();

  const userEarnings = useQuery<number>({
    queryKey: ['earnings'],
    queryFn: async () => {
      try {
        const res = await axios.get<number>(`/user/${user.id}/earnings`);
        return res.data;
      } catch (error: any) {
        console.error('Error fetching user bonuses:', error.message);
        throw error;
      }
    },
    refetchOnWindowFocus: true,
  });

  const userMonthlyShifts = useQuery<MonthlyShifts>({
    queryKey: ['monthlyShifts'],
    queryFn: async () => {
      try {
        return await axios.get<MonthlyShifts>(`/user/${user.id}/shifts`).then((res) => res.data);
      } catch (error: any) {
        console.error('Error fetching user monthly shifts:', error.message);
      }

      return { minutes: 0, seconds: 0, hours: 0 };
    },
    refetchOnWindowFocus: true,
  });

  const userTodayShifts = useQuery<Shift[]>({
    queryKey: ['todayShifts'],
    queryFn: async () => {
      try {
        return await axios
          .get<Shift[]>(`/shifts/user-today-shifts/${user.id}`)
          .then((res) => res.data);
      } catch (error: any) {
        console.error('Error fetching user today shifts:', error.message);
      }

      return [];
    },
    refetchOnWindowFocus: true,
  });

  const userBonuses = useQuery<Bonus[]>({
    queryKey: ['bonuses'],
    queryFn: async () => {
      try {
        return await axios.get<Bonus[]>(`/reward/bonus/monthly/${user.id}`).then((res) => res.data);
      } catch (error: any) {
        console.error('Error fetching user bonuses:', error.message);
      }

      return [];
    },
    refetchOnWindowFocus: true,
  });

  const userPenalties = useQuery<Penalty[]>({
    queryKey: ['penalties'],
    queryFn: async () => {
      try {
        return await axios
          .get<Bonus[]>(`/reward/penalty/monthly/${user.id}`)
          .then((res) => res.data);
      } catch (error: any) {
        console.error('Error fetching user penalties:', error.message);
      }

      return [];
    },
    refetchOnWindowFocus: true,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ['monthlyShifts', 'todayShifts', 'bonuses', 'penalties', 'earnings'],
      });
    }, [queryClient]),
  );

  const startTimeValue = useCallback(async () => {
    const startTimeStr = await AsyncStorage.getItem('startTime');
    if (!startTimeStr) {
      return [];
    }
    return [{ startTime: startTimeStr, endTime: new Date().toISOString() }];
  }, []);

  const todayShiftsValue = useMemo(
    () =>
      (async () => {
        const startTime: any = await startTimeValue();
        const shifts = userTodayShifts.data ? userTodayShifts.data.concat(startTime) : [];
        return sumAllShifts(shifts);
      })(),
    [userTodayShifts.data, startTimeValue],
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
      <View style={styles.headingWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Image style={styles.backIconImage} source={require('../assets/icons/leftArrow.png')} />
        </TouchableOpacity>
        <GradientText style={styles.heading}>Wynagrodzenie</GradientText>
      </View>

      {user.earningPerHour && (
        <>
          <Text style={styles.hourlyRateText}>Twoja stawka godzinowa:</Text>
          <Text style={styles.hourlyRate}>{user.earningPerHour.toPrecision(4)} zł / brutto</Text>
        </>
      )}

      <View style={styles.infoCardWrapper}>
        <InfoCardAsync
          title='Czas pracy dziś'
          fetchValue={async () => {
            try {
              return (await todayShiftsValue).text;
            } catch (error) {
              console.error('Error fetching today shifts value:', error);
              return '0';
            }
          }}
          styleForValue={styles.infoCardValue}
          style={styles.infoCard}
        />
        <InfoCardAsync
          title='Łączny czas pracy'
          fetchValue={async () =>
            (userMonthlyShifts.data &&
              `${userMonthlyShifts.data?.hours ?? ''}:${userMonthlyShifts.data?.minutes ?? ''}:${userMonthlyShifts.data?.seconds ?? ''}`) ||
            ''
          }
          styleForValue={styles.infoCardValue}
          style={styles.infoCard}
        />

        <InfoCard
          title='Zarobiłeś dziś'
          value={async () => ((await todayShiftsValue).hours * 23.5).toString() + ' zł'}
          styleForValue={styles.infoCardValue}
          style={styles.infoCard}
        />

        <InfoCard
          title='Zarobiłeś w obecnym miesiącu'
          value={async () => (await userEarnings.data) + ' zł'}
          styleForValue={styles.infoCardValue}
          style={{ ...styles.infoCard, ...styles.infoCardExtra }}
        />
      </View>

      <BonusesAndPenalties title='Premie' bonuses={userBonuses.data || []} />
      <BonusesAndPenalties title='Kary' bonuses={userPenalties.data || []} />
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
  wrapper: {
    paddingTop: 50,
    alignItems: 'center',
    paddingBottom: 50,
  },

  headingWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  backIcon: {
    width: 28,
    height: 28,
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: -14 }],
  },
  backIconImage: {
    objectFit: 'contain',
    width: 28,
    height: 28,
  },
  heading: {
    fontSize: 34,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Jost',
  },
  hourlyRateText: {
    fontSize: 16,
    color: '#BABABA',
    fontFamily: 'Jost-Regular',
    marginTop: 20,
  },
  hourlyRate: {
    fontSize: 32,
    color: colors.white,
    fontFamily: 'Jost',
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoCard: {
    marginBottom: 20,
  },
  infoCardWrapper: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  infoCardValue: {
    fontSize: 26,
  },

  infoCardExtra: {
    borderWidth: 2,
    borderColor: '#F1A51A',
    textAlign: 'center',
  },
});

export default SalaryScreen;
