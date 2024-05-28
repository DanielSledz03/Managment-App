import { colors } from '@constants/colors';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GradientText from '@/components/GradientText/GradientText';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkSchedule } from '@/types';
import { useAxios } from '@/hooks/useAxios';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import CalendarDay from '@components/CalendarDay/CalendarDay';
import { getDaysInCurrentMonth } from '@utils/getDaysInCurrentMonth';
import CalendarDayModal from '@view/CalendarDayModal/CalendarDayModal';

const WorkScheduleScreen = () => {
  const days = getDaysInCurrentMonth();
  const axios = useAxios();
  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  const { data: schedules } = useQuery<WorkSchedule[]>({
    queryKey: ['schedules'],
    queryFn: async () => {
      try {
        const response = await axios.get<WorkSchedule[]>(`/work-schedule/this-month/${user.id}`);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching user schedules:', error.message);
        } else {
          console.error('Error fetching user schedules:', error);
        }
        return [];
      }
    },
    refetchOnWindowFocus: true,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    }, [queryClient, user.id]),
  );

  return (
    <>
      <CalendarDayModal />
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        <GradientText style={styles.heading}>Grafik</GradientText>
        <Text style={styles.month}>
          Na miesiąc: <Text style={styles.monthUnderline}>Maj 2020</Text>
        </Text>

        <Text style={styles.daysDescription}>
          Wybierz konkretny dzień, aby wyświetlić szczegóły
        </Text>
        <View style={styles.daysWrapper}>
          {days.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              schedules={schedules?.filter(
                (schedule) =>
                  new Date(schedule.date).getMonth() == new Date(day.date).getMonth() &&
                  new Date(schedule.date).getDate() == new Date(day.date).getDate() &&
                  new Date(schedule.date).getFullYear() == new Date(day.date).getFullYear(),
              )}
            />
          ))}
        </View>
      </ScrollView>
    </>
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
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 34,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Jost',
  },
  month: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Jost',
    fontWeight: '600',
    marginTop: 10,
  },
  monthUnderline: {
    textDecorationLine: 'underline',
  },
  daysWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  daysDescription: {
    fontSize: 12,
    color: '#BABABA',
    fontFamily: 'Jost',
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 5,
  },
});

export default WorkScheduleScreen;
