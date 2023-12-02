import GradientButton from '@components/Button/GradientButton/GradientButton';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';
import { RootState } from '@store/index';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import { Task } from '@/types/Task.type';

const TaskRestoreModal = () => {
  const isModalOpen = useSelector((state: RootState) => state.taskModal.isOpen);
  const { openedTaskId } = useSelector((state: RootState) => state.taskModal);
  const axios = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ['tasks', openedTaskId],
    queryFn: async () => {
      return await axios.get('/task/' + openedTaskId).then((res) => res.data);
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
    });
  }, [openedTaskId]);
  const task: Task = data || undefined;

  console.log(openedTaskId, data);

  const handleTaskComplete = async () => {
    await axios
      .patch('/task/' + openedTaskId, { isCompleted: true })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    dispatch(TaskModalSliceAction.toggleModalOpen());
  };

  const date = useMemo(() => {
    if (!task) return null; // Handle the absence of 'task' gracefully

    return new Date(task.createdAt).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }, [task]);

  if (!task) return <View />;

  return (
    <ModalComponent containerStyle={styles.container} isOpen={isModalOpen}>
      {task.priority && <Text style={styles.priority}>Priorytet</Text>}
      <TouchableOpacity
        onPress={() => dispatch(TaskModalSliceAction.toggleModalOpen())}
        style={styles.closeContainer}
      >
        <Image style={styles.closeIcon} source={require('../../assets/icons/closeIcon.png')} />
        <Text style={styles.closeText}>Zamknij</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <Text style={styles.createdAt}>
        <Text style={{ fontWeight: 'bold' }}>Dodano:</Text> {date}
      </Text>

      <GradientButton
        title='Wykonane'
        onPress={handleTaskComplete}
        containerStyle={styles.submitButton}
        textStyle={{ fontSize: 16 }}
        gradientStyle={{ borderRadius: 10 }}
        gradientColors={[colors.greenBright, colors.greenBright]}
      />

      <GradientButton
        title='Przepisz'
        onPress={() => null}
        containerStyle={styles.submitButton}
        textStyle={{ fontSize: 16 }}
        gradientStyle={{ borderRadius: 10 }}
      />

      <GradientButton
        title='Odrzuć'
        onPress={() => null}
        containerStyle={styles.submitButton}
        textStyle={{ fontSize: 16 }}
        gradientStyle={{ borderRadius: 10 }}
        gradientColors={[colors.redBright, colors.redBright]}
      />
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },

  priority: {
    position: 'absolute',
    left: 15,
    top: 15,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.redBright,
  },

  closeContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },

  closeText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.darkSlate,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.black,
    marginBottom: 10,
  },

  description: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Jost',
    color: colors.greyDark8,
    marginBottom: 20,
  },

  createdAt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Jost',
    color: colors.darkSlate,
    marginBottom: 10,
  },

  submitButton: {
    width: '48%',
    marginBottom: 0,
  },
});

export default TaskRestoreModal;
