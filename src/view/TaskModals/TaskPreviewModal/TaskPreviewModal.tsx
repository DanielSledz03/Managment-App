import TaskCompletedContent from './content/TaskCompletedContent';
import TaskNotCompletedContent from './content/TaskNotCompletedContent';
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

      {task.status === TaskStatus.InProgress ? (
        <TaskNotCompletedContent
          handleTaskRejection={handleTaskRejection}
          task={task}
          date={date}
          handleTaskChangeAssignee={handleTaskChangeAssignee}
          handleTaskComplete={handleTaskComplete}
        />
      ) : (
        <TaskCompletedContent task={task} date={date} handleTaskComplete={handleTaskComplete} />
      )}
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
});

export default TaskPreviewModal;
