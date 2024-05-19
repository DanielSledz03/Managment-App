import { InfoCard } from '@components/InfoCard/InfoCard';
import { TaskCard } from '@components/TaskCard/TaskCard';
import { colors } from '@constants/colors';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootState } from '@store/index';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import HeaderBar from '@view/HeaderBar/HeaderBar';
import { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GradientText from '@/components/GradientText/GradientText';
import StartWorkButton from '@view/StartWorkButton/StartWorkButton';
import { useAxios } from '@/hooks/useAxios';
import { RootStackParamList } from '@/navigation/TabNavigation';
import { Shift, Penalty, Bonus, Task, TaskStatus } from '@/types';
import { sumAllShifts } from '@utils/sumAllShifts';

type DashboardNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<DashboardNavigationProp>();
  const axios = useAxios();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const today = new Date().toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const tasks: { data?: Task[] } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      return await axios.get('/task').then((res) => res.data);
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

  const userMonthlyShifts = useQuery<Shift[]>({
    queryKey: ['monthlyShifts'],
    queryFn: async () => {
      const currentDate = new Date();
      try {
        return await axios
          .get<
            Shift[]
          >(`/shifts/user-monthly-shifts/${user.id}/${currentDate.getMonth()}/${currentDate.getFullYear()}`)
          .then((res) => res.data);
      } catch (error: any) {
        console.error('Error fetching user monthly shifts:', error.message);
      }

      return [];
    },
    refetchOnWindowFocus: true,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', 'bonuses', 'penalties'],
      });
    }, [queryClient]),
  );

  const monthlyShiftsValue = useMemo(
    () => sumAllShifts(userMonthlyShifts.data || []),
    [userMonthlyShifts.data],
  );

  return (
    <ScrollView style={styles.container}>
      <HeaderBar />
      <Text style={styles.date}>{today}</Text>
      <GradientText style={styles.heading}>Dzień dobry {user.name}!</GradientText>

      <StartWorkButton />

      <View style={styles.userTasksContainer}>
        <InfoCard
          title='Przypisane zadania'
          value={
            tasks?.data
              ?.filter((task) => task.status === TaskStatus.InProgress)
              .length?.toString() || '0'
          }
          onPress={() => navigation.navigate('Tasks')}
        />
        <InfoCard
          title='Twoje wynagrodzenie'
          value={async () =>
            (
              (await monthlyShiftsValue).hours * 23.5 +
              (userBonuses.data || []).reduce((acc, obj) => acc + obj.amount, 0) +
              (userPenalties.data || []).reduce((acc, obj) => acc + obj.amount, 0)
            ).toString() + ' zł'
          }
          onPress={() => navigation.navigate('Salary')}
        />
      </View>

      {tasks.data && (
        <>
          <GradientText style={styles.heading}>Przypisane zadania</GradientText>

          {tasks.data
            .filter((task) => task.status === TaskStatus.InProgress)
            .slice(0, 2)
            .map((task: Task) => (
              <TaskCard
                onPress={() => {
                  navigation.navigate('Tasks');
                  dispatch(TaskModalSliceAction.toggleModalOpen(task.id));
                }}
                key={task.id}
                taskTime={task.createdAt}
                title={task.title}
                priority={task.priority}
              />
            ))}
        </>
      )}
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
    fontWeight: 'bold',
    fontFamily: 'Jost',
  },

  date: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Jost-Regular',
  },

  userTasksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginBottom: 15,
  },
});

export default Dashboard;
