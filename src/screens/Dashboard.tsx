import GradientText from '@/components/GradientText/GradientText';
import StartWorkButton from '@/components/StartWorkButton/StartWorkButton';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@constants/colors';
import HeaderBar from '@view/HeaderBar/HeaderBar';
import { InfoCard } from '@components/InfoCard/InfoCard';
import { TaskCard } from '@components/TaskCard/TaskCard';
import { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { NavigationProp, RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Task } from '@/types/Task.type';
import { RootStackParamList } from '@/navigation/TabNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Config from 'react-native-config';
import { useAxios } from '@/hooks/useAxios';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';

type DashboardNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<DashboardNavigationProp>();
  const axios = useAxios();
  const dispatch = useDispatch();

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

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    }, [queryClient]),
  );

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
        <InfoCard
          title='Przypisane zadania'
          value={tasks?.data?.length?.toString() || '0'}
          onPress={() => navigation.navigate('Tasks')}
        />
        <InfoCard title='Twoje wynagrodzenie' value={'1445 zł'} />
      </View>

      {tasks.data && (
        <>
          <GradientText style={styles.heading}>Przypisane zadania</GradientText>

          {tasks.data.slice(0, 2).map((task: Task) => (
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
    fontFamily: 'Jost-SemiBold',
  },

  date: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Jost-Regular',
  },
});

export default Dashboard;
