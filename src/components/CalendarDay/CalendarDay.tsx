import { WorkSchedule } from '@/types';
import { colors } from '@constants/colors';
import { CalendarDaySliceAction } from '@store/Modal/CalendarDay.reducer';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

interface CalendarDayProps {
  day: { id: number; date: Date };
  schedules: WorkSchedule[] | undefined;
}

const CalendarDay = ({ day, schedules }: CalendarDayProps) => {
  const todaySchedule = schedules?.filter(
    (schedule) => new Date(schedule.date).getDate() === day.date.getDate(),
  );
  const dispatch = useDispatch();

  const handlePress = () => {
    if (!todaySchedule?.length) return;
    dispatch(CalendarDaySliceAction.toggleModalOpen(day.date.toISOString()));
  };

  return (
    <TouchableOpacity
      activeOpacity={todaySchedule?.length ? 0.5 : 1}
      key={day.id}
      onPress={handlePress}
      style={[styles.dayContainer, { borderColor: todaySchedule?.length ? '#F2C00F' : 'white' }]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(38,38,38, 0)', 'rgba(38,38,38, 1)']}
        style={styles.gradient}
      >
        <Text style={styles.dayText}>{day.date.getDate()}</Text>
        {(todaySchedule ?? []).length > 0 && (
          <Text style={styles.scheduleTime}>
            {todaySchedule?.[0].startTime}-{todaySchedule?.[0].endTime}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CalendarDay;

const styles = StyleSheet.create({
  dayContainer: {
    width: '18%',
    height: 60,
    backgroundColor: colors.greyDark1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.greyDark2,
    marginTop: 10,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: colors.white,
    fontFamily: 'Jost',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  scheduleTime: {
    color: colors.white,
    fontFamily: 'Jost',
    fontSize: 8,
    textAlign: 'center',
  },
});
