import GradientButton from '@components/Button/GradientButton/GradientButton';
import CloseButton from '@components/Modal/CloseButton';
import ModalComponent from '@components/Modal/Modal';
import { colors } from '@constants/colors';
import { TaskModalSliceAction } from '@store/Modal/TaskModal.reducer';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import useModalState from '@/hooks/useModalState';
import { TaskStatus } from '@/types/Task.type';

const TaskCompletedPreviewModal = () => {
  const { openedTaskId, task, date } = useModalState();
  const axios = useAxios();
  const dispatch = useDispatch();

  const handleTaskComplete = async () => {
    try {
      await axios.patch(`/task/${openedTaskId}`, {
        status:
          task?.status === TaskStatus.InProgress ? TaskStatus.Completed : TaskStatus.InProgress,
      });
      dispatch(TaskModalSliceAction.toggleCompletedModalOpen());
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => dispatch(TaskModalSliceAction.toggleCompletedModalOpen());

  return (
    <ModalComponent containerStyle={styles.container} isOpen={true}>
      {task?.priority && <Text style={styles.priority}>Priorytet</Text>}
      <CloseButton onPress={closeModal} />
      <View style={styles.taskCompleted}>
        <Image
          style={styles.taskCompletedIcon}
          source={require('../../assets/icons/taskCompleted.png')}
        />
        <Text style={styles.taskCompletedText}>Wykonane</Text>
      </View>
      <Text style={styles.title}>{task?.title}</Text>
      <Text style={styles.description}>{task?.description}</Text>
      <Text style={styles.createdAt}>
        <Text style={{ fontWeight: 'bold' }}>Dodano:</Text> {date}
      </Text>
      <GradientButton
        title='Przywróć zadanie'
        onPress={handleTaskComplete}
        containerStyle={styles.restoreButton}
        textStyle={{ fontSize: 16 }}
        gradientStyle={{ borderRadius: 10 }}
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

  taskCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  taskCompletedIcon: {
    width: 24,
    height: 24,
  },

  taskCompletedText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.green,
    marginLeft: 2,
  },

  restoreButton: {
    width: Platform.OS === 'android' ? '60%' : '70%',
    marginBottom: 0,
  },
});

export default TaskCompletedPreviewModal;
