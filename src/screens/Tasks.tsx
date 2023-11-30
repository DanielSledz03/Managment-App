import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { colors } from '@constants/colors';
import { TaskCard } from '@components/TaskCard/TaskCard';
import TabButton from '@components/TabButton/TabButton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { Task } from '@/types/Task.type';
import { useFocusEffect } from '@react-navigation/native';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import TaskPreviewModal from '@view/TaskModals/TaskPreviewModal/TaskPreviewModal';
import { useAxios } from '@utils/axios';
import { useCallback, useMemo, useState } from 'react';
import TaskRestoreModal from '@view/TaskModals/TaskRestoreModal';

type GroupedTasks = { [key: string]: Task[] };

const Tasks = () => {
  const [completedTasksTab, setCompletedTasksTab] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.taskModal.isOpen);
  const restoreTaskModalOpen = useSelector(
    (state: RootState) => state.taskModal.restoreTaskModalOpen,
  );

  const axios = useAxios();

  const { data: tasksData } = useQuery<Task[]>({
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
    }, [queryClient, completedTasksTab, isModalOpen]),
  );

  const getGroupLabel = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Dzisiaj';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Wczoraj';
    } else {
      return date.toLocaleDateString('pl-PL');
    }
  };

  const sortedAndGroupedTasks = useMemo(() => {
    if (!tasksData) {
      return {};
    }

    const priorityTasks = tasksData.filter((task) => task.priority);
    const nonPriorityTasks = tasksData.filter((task) => !task.priority);

    const groupedNonPriorityTasks = nonPriorityTasks
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .reduce((acc: GroupedTasks, task: Task) => {
        const groupLabel = getGroupLabel(new Date(task.createdAt));
        acc[groupLabel] = acc[groupLabel] || [];
        acc[groupLabel].push(task);
        return acc;
      }, {});

    if (priorityTasks.length) {
      groupedNonPriorityTasks['Priorytet'] = priorityTasks;
    }

    return groupedNonPriorityTasks;
  }, [tasksData]);

  return (
    <>
      {isModalOpen && <TaskPreviewModal />}
      {restoreTaskModalOpen && <TaskRestoreModal />}

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Lista zadań</Text>
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
          {sortedAndGroupedTasks['Priorytet'] &&
            sortedAndGroupedTasks['Priorytet'].filter(
              (task: Task) => task.isCompleted === completedTasksTab,
            ).length > 0 && (
              <View>
                <Text style={styles.dateLabel}>Priorytet</Text>
                {sortedAndGroupedTasks['Priorytet']
                  .filter((task: Task) => task.isCompleted === completedTasksTab)
                  .map((task: Task) => (
                    <TaskCard
                      onPress={() => dispatch(TaskModalSliceAction.toggleModalOpen(task.id))}
                      key={task.id}
                      taskTime={task.createdAt}
                      title={task.title}
                      priority={task.priority}
                    />
                  ))}
              </View>
            )}
          {Object.entries(sortedAndGroupedTasks).map(
            ([groupLabel, tasksForGroup]) =>
              groupLabel !== 'Priorytet' &&
              tasksForGroup.filter((task: Task) => task.isCompleted === completedTasksTab).length >
                0 && (
                <View key={groupLabel}>
                  <Text style={styles.dateLabel}>{groupLabel}</Text>
                  {tasksForGroup
                    .filter((task: Task) => task.isCompleted === completedTasksTab)
                    .map((task: Task) => (
                      <TaskCard
                        onPress={() => dispatch(TaskModalSliceAction.toggleModalOpen(task.id))}
                        key={task.id}
                        taskTime={task.createdAt}
                        title={task.title}
                        priority={task.priority}
                      />
                    ))}
                </View>
              ),
          )}
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
  dateLabel: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 10,
    fontFamily: 'Jost-SemiBold',
  },
});

export default Tasks;
