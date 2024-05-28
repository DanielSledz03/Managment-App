import GradientButton from '@components/Button/GradientButton/GradientButton';
import CloseButton from '@components/Modal/CloseButton';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import useModalState from '@/hooks/useModalState';
import { TaskStatus } from '@/types/Task.type';
import { RootState } from '@store/index';
import { WorkSchedule } from '@/types';
import { CalendarDaySliceAction } from '@store/Modal/CalendarDay.reducer';

const CalendarDayModal = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isOpen, date } = useSelector((state: RootState) => state.calendarDayModal);

  const { data: schedules } = useQuery<WorkSchedule[]>({
    queryKey: ['schedules'],
    queryFn: async () => {
      try {
        const response = await axios.get<WorkSchedule[]>(`/work-schedule/${date}`);
        return response.data;
      } catch (error: any) {
        console.error('Error fetching user schedules:', error.message);
        return [];
      }
    },
    refetchOnWindowFocus: true,
  });

  const handleClose = () => {
    dispatch(CalendarDaySliceAction.toggleModalOpen(''));
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['schedules'],
    });
  }, [isOpen, date]);

  console.log('schedules', schedules);

  return (
    <ModalComponent containerStyle={styles.container} isOpen={isOpen}>
      <CloseButton onPress={handleClose}></CloseButton>

      <Text style={styles.currentDate}>Środa, 18 października 2023</Text>

      {schedules?.length &&
        schedules.map((schedule) => {
          return (
            <View key={schedule.id} style={styles.scheduleContainer}>
              <Text>{schedule.user?.name}</Text>
              <Text>
                {schedule.startTime}-{schedule.endTime}
              </Text>

              <View style={styles.scheduleUnderline} />
            </View>
          );
        })}
      {/* <Text>{name}</Text> */}
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',

    minHeight: 380,
  },

  currentDate: {
    fontSize: 16,
    color: '#262626',
    fontFamily: 'Jost',
    fontWeight: 'regular',
    marginBottom: 40,
  },

  scheduleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    paddingBottom: 5,
  },

  scheduleUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#BABABA',
  },
});

export default CalendarDayModal;
