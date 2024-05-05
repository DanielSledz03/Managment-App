import GradientButton from '@components/Button/GradientButton/GradientButton';
import CloseButton from '@components/Modal/CloseButton';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import useModalState from '@/hooks/useModalState';
import { TaskStatus } from '@/types/Task.type';

const TaskPreviewModal = () => {
  const { isModalOpen, openedTaskId, task, date } = useModalState();

  const axios = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const closeModal = () => dispatch(TaskModalSliceAction.toggleModalOpen());

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
    });
  }, [openedTaskId]);

  const handleTaskComplete = async () => {
    try {
      await axios.patch(`/task/${openedTaskId}`, {
        status:
          task?.status === TaskStatus.InProgress ? TaskStatus.Completed : TaskStatus.InProgress,
      });
      dispatch(TaskModalSliceAction.toggleModalOpen());
    } catch (err) {
      console.log(err);
    }
  };

  const handleTaskRejection = () => {
    dispatch(TaskModalSliceAction.toggleRejectionModalOpen());
  };

  const handleTaskChangeAssignee = () => {
    dispatch(TaskModalSliceAction.toggleAssigneeChangeModalOpen());
  };

  if (!task) return <View />;

  return (
    <ModalComponent containerStyle={styles.container} isOpen={isModalOpen}>
      {task.priority && <Text style={styles.priority}>Priorytet</Text>}
      <CloseButton onPress={closeModal} />
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
        onPress={handleTaskChangeAssignee}
        containerStyle={styles.submitButton}
        textStyle={{ fontSize: 16 }}
        gradientStyle={{ borderRadius: 10 }}
      />
      <GradientButton
        title='Odrzuć'
        onPress={handleTaskRejection}
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

export default TaskPreviewModal;
