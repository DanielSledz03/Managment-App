import GradientText from '@/components/GradientText/GradientText';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@constants/colors';
import { TaskCard } from '@components/TaskCard/TaskCard';
import TabButton from '@components/TabButton/TabButton';
import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { Task } from '@/types/Task.type';
import { useFocusEffect } from '@react-navigation/native';
import Config from 'react-native-config';

const Tasks = () => {
  const [completedTasksTab, setCompletedTasksTab] = useState(false);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const tasks: { data: Task[] } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const axiosInstance = axios.create({
        baseURL: Config.HOSTNAME,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await axiosInstance.get('/task').then((res) => res.data);
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
      <GradientText style={styles.heading}>Lista zadań</GradientText>
      <View style={styles.tabButtons}>
        <TabButton
          title='Do zrobienia'
          isSelected={!completedTasksTab}
          onPress={() => setCompletedTasksTab(false)}
        />
        <TabButton
          title='Wykonane'
          isSelected={completedTasksTab}
          onPress={() => setCompletedTasksTab(true)}
        />
      </View>

      <View style={{ marginBottom: 50 }}>
        {tasks.data &&
          tasks.data
            .filter((task) => task.isCompleted === completedTasksTab)
            .map((task: Task) => (
              <TaskCard key={task.id} taskTime={task.createdAt} title={task.title} />
            ))}
      </View>
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
    paddingBottom: 30,
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

export default Tasks;
